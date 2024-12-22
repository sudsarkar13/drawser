import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	const client = await clientPromise;
	const db = client.db();

	const data = await req.json();
	const whiteboard = {
		...data,
		userId: session.user.id,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const result = await db.collection("whiteboards").insertOne(whiteboard);
	return new Response(JSON.stringify(result), { status: 201 });
}
