import { hash } from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
	try {
		const { email, password, name } = await req.json();

		if (!email || !password) {
			return new Response("Missing fields", { status: 400 });
		}

		const client = await clientPromise;
		const users = client.db().collection("users");

		const exists = await users.findOne({ email });
		if (exists) {
			return new Response("User already exists", { status: 400 });
		}

		const hashedPassword = await hash(password, 10);
		await users.insertOne({
			email,
			password: hashedPassword,
			name,
			createdAt: new Date(),
		});

		return new Response("User created", { status: 201 });
	} catch (error) {
		return new Response("Error creating user", { status: 500 });
	}
}
