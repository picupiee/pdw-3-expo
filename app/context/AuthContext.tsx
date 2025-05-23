import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, useSegments } from "expo-router";

const parseCookies = () => {
  if (typeof document === "undefined") return {}; // Not in browser
  return Object.fromEntries(
    document.cookie.split("; ").map((c) => c.split("="))
  );
};

interface AuthContextType {
  user: { userId: string; roles: string[] } | null; // Decoded user object
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ userId: string; roles: string[] } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Function to decoded JWT (client-side, for access token's payload)
  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding JWT", e);
      return null;
    }
  };
  // Check initial authentication status (on app load, page refresh)
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const cookies = parseCookies();
      const accessToken = cookies.access_token;

      if (accessToken) {
        const payload = decodeJwt(accessToken);
        if (payload && payload.exp * 1000 > Date.now()) {
          setUser({ userId: payload.userId, roles: payload.roles });
        } else {
          await refreshAccessToken();
        }
      } else {
        await refreshAccessToken();
      }
    } catch (error) {
      console.error("Initial auth check failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to refresh access token using refresh token
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh"); // Browser automatically sends HttpOnly refresh_token cookie
      if (response.ok) {
        const cookies = parseCookies();
        const newAccessToken = cookies.access_token;
        if (newAccessToken) {
          const payload = decodeJwt(newAccessToken);
          setUser({ userId: payload.userId, roles: payload.roles });
          return true;
        }
      }
      // If refresh token failed, clear user
      setUser(null);
      return false;
    } catch (error) {
      console.error("Failed to refresh token", error);
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Handle redirects based on authentication status
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(app)";

    if (!user && inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && segments[0] === "sign-in") {
      router.replace("/dashboard");
    }
  }, [user, isLoading, segments, router]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Server will set HttpOnly cookies. No need to parse token from response body here.
          await checkAuthStatus();
          return true;
        } else {
          const errorData = await response.json();
          console.error("Sign-in failed", errorData.message);
          setUser(null);
          return false;
        }
      } catch (error) {
        console.error("Sign-in network error", error);
        setUser(null);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuthStatus]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Sign-out failed", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
