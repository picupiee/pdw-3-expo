import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set!");
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) {
      return Response.json({ message: "No cookies provided" }, { status: 401 });
    }

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
    );
    const refreshToken = cookies.refresh_token;

    if (!refreshToken) {
      return Response.json(
        { message: "No refresh token found" },
        { status: 401 }
      );
    }

    // 1. Verify refresh token
    let decodedRefreshToken: jwt.JwtPayload;
    try {
      decodedRefreshToken = jwt.verify(
        refreshToken,
        JWT_SECRET
      ) as jwt.JwtPayload;
    } catch (error) {
      const response = Response.json(
        { message: "Invalid or expired refresh token" },
        { status: 403 }
      );
      response.headers.append(
        "Set-Cookie",
        `access_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
      );
      response.headers.append(
        "Set-Cookie",
        `refresh_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
      );
      return response;
    }

    const userId = decodedRefreshToken.userId;

    // 2. Validate Refresh Token from Database (CRITICAL)
    // const storedRefreshToken = await db.getRefreshToken(userId, refreshToken);
    // if (!storedRefreshToken) {
    //   return Response.json({ message: 'Refresh token revoked or not found' }, { status: 403 });
    // }

    // 3. Generate new Access Token
    const newAccessToken = jwt.sign(
      { userId: userId, roles: ["user"] },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 4. (Optional) Rotate Refresh Token
    // const newRefreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    // await db.updateRefreshToken(oldRefreshToken, newRefreshToken); // Invalidate old, save new

    const response = new Response(
      JSON.stringify({ message: "Access token refreshed" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `access_token=<span class="math-inline">\{newAccessToken\}; HttpOnly; Secure; SameSite\=Lax; Path\=/; Max\-Age\=</span>{15 * 60}`,
          // If rotating refresh token:
          // 'Set-Cookie': `refresh_token=<span class="math-inline">\{newRefreshToken\}; HttpOnly; Secure; SameSite\=Lax; Path\=/; Max\-Age\=</span>{7 * 24 * 60 * 60}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
