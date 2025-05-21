import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useSegments } from "expo-router";

interface AuthContextType {
  user: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
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
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        // No token set
        setUser(null);
      } catch (e) {
        console.error("Failed to load user token");
      } finally {
        setIsLoading(false);
      }
    };
    checkStoredToken();
  }, []);
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(app)";

    if (!user && inAuthGroup) {
      router.replace("/sign-in");
    } else if (
      user &&
      !inAuthGroup &&
      segments[0] !== "_sitemap" &&
      segments.length > 0 &&
      segments[0] !== "[...404]"
    ) {
      if (segments[0] === "sign-in") {
        router.replace("/dashboard");
      }
    }
  }, [user, isLoading, segments, router]);

  const signIn = (token: string) => {
    setUser(token);
  };

  const signOut = () => {
    setUser(null);
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
