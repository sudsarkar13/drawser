"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function NavBar() {
	const { data: session, status } = useSession();

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 items-center justify-between">
				<Link href="/" className="font-semibold">
					Drawser
				</Link>

				<div className="flex items-center gap-4">
					{status === "loading" ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : session ? (
						<>
							<Link href="/whiteboards">
								<Button variant="ghost">My Whiteboards</Button>
							</Link>
							<Button variant="outline" onClick={() => signOut()}>
								Sign Out
							</Button>
						</>
					) : (
						<div className="flex gap-2">
							<Button variant="ghost" onClick={() => signIn("google")}>
								Sign in with Google
							</Button>
							<Button onClick={() => signIn("credentials")}>Sign In</Button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
