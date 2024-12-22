import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

// Add this function to create indexes
async function createIndexes() {
	const client = await clientPromise;
	const db = client.db();

	await db.collection("whiteboards").createIndexes([
		// Index for querying whiteboards by userId
		{ key: { userId: 1 }, name: "userId_1" },

		// Compound index for userId + updatedAt for sorted queries
		{ key: { userId: 1, updatedAt: -1 }, name: "userId_1_updatedAt_-1" },

		// Index for collaborators array
		{ key: { collaborators: 1 }, name: "collaborators_1" },

		// Text index for searching by name
		{ key: { name: "text" }, name: "name_text" },
	]);
}

// Call createIndexes on app initialization
createIndexes().catch(console.error);

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

export async function GET(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	const client = await clientPromise;
	const db = client.db();

	const url = new URL(req.url);
	const search = url.searchParams.get("search");
	const sort = url.searchParams.get("sort") || "updatedAt";
	const order = url.searchParams.get("order") || "desc";

	let query: any = {
		$or: [{ userId: session.user.id }, { collaborators: session.user.id }],
	};

	if (search) {
		query.$text = { $search: search };
	}

	const whiteboards = await db
		.collection("whiteboards")
		.find(query)
		.sort({ [sort]: order === "desc" ? -1 : 1 })
		.limit(50)
		.toArray();

	return new Response(JSON.stringify(whiteboards), { status: 200 });
}
