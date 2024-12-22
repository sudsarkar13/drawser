import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="mx-auto w-full max-w-sm space-y-6">
				<div className="space-y-2 text-center">
					<Skeleton className="h-8 w-48 mx-auto" />
					<Skeleton className="h-4 w-64 mx-auto" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</div>
	);
}
