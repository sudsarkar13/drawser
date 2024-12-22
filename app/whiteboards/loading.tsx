import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container py-8">
			<div className="flex justify-between items-center mb-8">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-10 w-32" />
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<Skeleton key={i} className="h-32 w-full" />
				))}
			</div>
		</div>
	);
}
