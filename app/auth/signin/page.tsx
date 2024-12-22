"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
	const router = useRouter();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const result = await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirect: false,
		});

		if (result?.error) {
			toast({
				title: "Error",
				description: result.error,
				variant: "destructive",
			});
		} else {
			router.push("/whiteboards");
			router.refresh();
		}

		setLoading(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="mx-auto w-full max-w-sm space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-bold">Sign In</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email below to sign in to your account
					</p>
				</div>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Input
							name="email"
							placeholder="name@example.com"
							required
							type="email"
						/>
					</div>
					<div className="space-y-2">
						<Input
							name="password"
							placeholder="Password"
							required
							type="password"
						/>
					</div>
					<Button className="w-full" type="submit" disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</Button>
				</form>
			</div>
		</div>
	);
}
