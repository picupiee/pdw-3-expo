export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("Cookie");
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("="))
      );
      const refreshToken = cookies.refresh_token;
    }

    // 1. Invalidate Refresh token in Database (CRITICAL)
    // if (refreshToken) {
    // await db.invalidateRefreshToken(userId, refreshToken);
    // }

    // 2. Clear cookies from the client's browser
    const response = new Response(
      JSON.stringify({ message: "Logout successful" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // "Set-Cookie": `access_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
          // "Set-Cookie": `refresh_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
        },
      }
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
  } catch (error) {
    console.error("Logout error: ", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
