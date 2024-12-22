import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { nanoid } from "nanoid";

export async function POST() {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	const client = await clientPromise;
	const db = client.db();

	const whiteboard = {
		id: nanoid(),
		userId: session.user.id,
		name: "Untitled Whiteboard",
		content: {
			version: 1,
			elements: [],
			viewport: { x: 0, y: 0, zoom: 1 },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	await db.collection("whiteboards").insertOne(whiteboard);
	return Response.json({ id: whiteboard.id });
}
