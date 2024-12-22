import { Button } from "@/components/ui/button";
import { ArrowRight, Pencil } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center p-4">
			<div className="container mx-auto max-w-4xl">
				{/* Hero Section */}
				<div className="flex flex-col">
					<div className="container flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
						<h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							The Whiteboard for
							<br />
							<span className="text-primary">Engineering Teams</span>
						</h1>

						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Visualize your ideas, collaborate in real-time, and build better
							together. The infinite canvas for your team&apos;s creativity.
						</p>

						<div className="flex gap-4">
							<Link href="/whiteboards/new">
								<Button size="lg" className="gap-2">
									<Pencil className="h-4 w-4" />
									Start Drawing
								</Button>
							</Link>
							<Link href="/explore">
								<Button variant="outline" size="lg" className="gap-2">
									Explore Templates
									<ArrowRight className="h-4 w-4" />
								</Button>
							</Link>
						</div>
					</div>

					{/* Features Grid */}
					<div className="container py-12">
						<div className="grid gap-8 md:grid-cols-3">
							<div className="rounded-lg border bg-card p-6">
								<h3 className="mb-2 font-semibold">Real-time Collaboration</h3>
								<p className="text-sm text-muted-foreground">
									Work together with your team in real-time, see changes
									instantly.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6">
								<h3 className="mb-2 font-semibold">Infinite Canvas</h3>
								<p className="text-sm text-muted-foreground">
									Never run out of space. Your ideas deserve room to grow.
								</p>
							</div>
							<div className="rounded-lg border bg-card p-6">
								<h3 className="mb-2 font-semibold">Export & Share</h3>
								<p className="text-sm text-muted-foreground">
									Export your work in multiple formats and share with anyone.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<footer className="border-t py-6">
					<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
						<p className="text-sm text-muted-foreground">
							Built with Next.js, Tailwind CSS, and MongoDB
						</p>
						<div className="flex gap-4">
							<Link
								href="/privacy"
								className="text-sm text-muted-foreground hover:underline">
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="text-sm text-muted-foreground hover:underline">
								Terms of Service
							</Link>
						</div>
					</div>
				</footer>
			</div>
		</main>
	);
}
