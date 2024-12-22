import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getWhiteboards(userId: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/whiteboards`,
		{
			cache: "no-store",
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch whiteboards");
	}

	return res.json();
}

export default async function WhiteboardsPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect("/api/auth/signin");
	}

	const whiteboards = await getWhiteboards(session.user.id);

	return (
		<div className="container py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Your Whiteboards</h1>
				<Link href="/whiteboards/new">
					<Button className="gap-2">
						<Plus className="h-4 w-4" />
						New Whiteboard
					</Button>
				</Link>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{whiteboards.map((whiteboard: any) => (
					<Link
						key={whiteboard.id}
						href={`/whiteboards/${whiteboard.id}`}
						className="block p-4 rounded-lg border hover:border-primary transition-colors">
						<h2 className="font-semibold mb-2">{whiteboard.name}</h2>
						<p className="text-sm text-muted-foreground">
							Last edited {new Date(whiteboard.updatedAt).toLocaleDateString()}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
