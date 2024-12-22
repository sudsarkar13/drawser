import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const client = await clientPromise;
		const db = client.db();

		const whiteboard = await db
			.collection("whiteboards")
			.findOne({ id: params.id });

		if (!whiteboard) {
			return new Response("Whiteboard not found", { status: 404 });
		}

		if (
			whiteboard.userId !== session.user.id &&
			!whiteboard.collaborators?.includes(session.user.id)
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		const updates = await req.json();
		const result = await db
			.collection("whiteboards")
			.updateOne(
				{ id: params.id },
				{ $set: { ...updates, updatedAt: new Date() } }
			);

		return NextResponse.json(result);
	} catch (error) {
		return new Response("Error updating whiteboard", { status: 500 });
	}
}
