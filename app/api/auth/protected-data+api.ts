import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET env-var is not set !");
}

function verifyAccessToken(req: Request) {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const accessToken = cookies.access_token;

  if (!accessToken) return null;

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;
    return decoded;
  } catch (error) {
    console.warn("Access token verification failed", error);
    return null;
  }
}

export async function GET(req: Request) {
  const userPayload = verifyAccessToken(req);

  if (!userPayload) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const protectedData = {
    message: `Hello ${userPayload.userId}! This is protected data.`,
    yourRoles: userPayload.roles,
    timestamp: new Date().toISOString(),
  };

  return Response.json(protectedData);
}
