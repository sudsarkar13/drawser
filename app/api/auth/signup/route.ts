import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(2),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password, name } = signupSchema.parse(body);

		const client = await clientPromise;
		const db = client.db();
		const users = db.collection("users");

		// Check if user already exists
		const existingUser = await users.findOne({
			email: email.toLowerCase(),
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "Email already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user
		const result = await users.insertOne({
			email: email.toLowerCase(),
			password: hashedPassword,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json(
			{ message: "User created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: error.errors[0].message },
				{ status: 400 }
			);
		}

		console.error("Signup error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
