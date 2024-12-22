import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { Canvas } from "@/components/whiteboard/Canvas";
import { Toolbar } from "@/components/whiteboard/Toolbar";
import { ExportMenu } from "@/components/whiteboard/ExportMenu";

async function getWhiteboard(id: string) {
	const client = await clientPromise;
	const db = client.db();
	return db.collection("whiteboards").findOne({ id });
}

export default async function WhiteboardPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		redirect("/api/auth/signin");
	}

	const whiteboard = await getWhiteboard(params.id);
	if (!whiteboard) {
		redirect("/whiteboards");
	}

	if (
		whiteboard.userId !== session.user.id &&
		!whiteboard.collaborators?.includes(session.user.id)
	) {
		redirect("/whiteboards");
	}

	return (
		<div className="h-screen flex flex-col">
			<header className="border-b p-4 flex justify-between items-center">
				<Toolbar />
				<ExportMenu />
			</header>

			<main className="flex-1 relative">
				<Canvas />
			</main>
		</div>
	);
}
