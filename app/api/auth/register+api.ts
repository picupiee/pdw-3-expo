import bcrypt from 'bcrypt';
// reserved for importing database utilty

export async function POST(req: Request) {
    try {
        const {email, password} = await req.json();

        if (!email || !password) {
            return Response.json({message: "Email and password are required"}, {status: 400});
        }

        // 1. Validate existing user before user can register a new account (query my database)
        // const existingUser = await db.getUserByEmail(email);
        // if (existingUser) {
        // return Response.json({message: "User already exists"}, {status: 409});
        // }
        // remove the comment tag above when the api is working
        
        // 2. Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save user to my database
        // const newUser = await db.createUser({email, password: hashedPassword})

        // For demo, assuming user is created
        const newUser = {id: 'newUserId', email};

        return Response.json({message: "User Registered Successfully", userId: newUser.id}, {status: 201})
    } catch (error) {
        console.error('Registration error:', error);
        return Response.json({message: "Internal server error"}, {status: 500})
    }
}