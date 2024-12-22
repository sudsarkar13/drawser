import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavBar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto max-w-4xl flex h-14 items-center">
				<div className="mr-4 flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="font-bold">Whiteboard</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center space-x-6">
						<Link
							href="/explore"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
							Explore
						</Link>
						<Link
							href="/docs"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
							Docs
						</Link>
					</nav>
					<div className="flex items-center space-x-2">
						<Link href="/whiteboards/new">
							<Button size="sm">New Whiteboard</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
