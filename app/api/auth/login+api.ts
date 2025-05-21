import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// reserved for database utility

// JWT_SECRET is set as an EAS Secret environment variable
const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set!');
}

export async function POST(req: Request) {
    try {
        const {email, password} = await req.json();
        
        // 1. Find user in the database by email
        // const user = await db.getUserByEmail(email);
        // Demo user below
        const user = {id: 'demo123', email: 'demo@pdw.com', hashedPassword: await bcrypt.hash('password123', 10), roles: ['user']};
        if (email !== user.email) {
         return Response.json({message: "Invalid credentials"}, {status: 401})
        }

        // 2. Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return Response.json({message: "Invalid credentials"}, {status: 401})
        }

        // 3. Generate access token (short-lived)
        const accessToken = jwt.sign(
            {userId: user.id, roles: user.roles},
            JWT_SECRET,
            {expiresIn: "15m"} // Token expired in 15 minutes !
        );

        // 4. Refresh short-lived token
        const refreshToken = jwt.sign({
            userId: user.id
        }, JWT_SECRET, {expiresIn: "7d"});
        // 5. Store Refreshed token in Database (IMPORTANT for invalidation/revocation)
    }
}