"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function NewWhiteboardPage() {
	const router = useRouter();

	useEffect(() => {
		async function createWhiteboard() {
			const res = await fetch("/api/whiteboards/new", {
				method: "POST",
			});

			if (!res.ok) {
				throw new Error("Failed to create whiteboard");
			}

			const { id } = await res.json();
			router.push(`/whiteboards/${id}`);
		}

		createWhiteboard();
	}, [router]);

	return (
		<div className="flex h-[calc(100vh-4rem)] items-center justify-center">
			<Loader2 className="h-6 w-6 animate-spin" />
		</div>
	);
}
