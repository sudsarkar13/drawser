import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const email = searchParams.get("email");

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const client = await clientPromise;
		const db = client.db();
		const user = await db.collection("users").findOne({
			email: email.toLowerCase(),
		});

		return NextResponse.json({ exists: !!user });
	} catch (error) {
		console.error("Check email error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
