"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignUp() {
	const router = useRouter();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify({
				email: formData.get("email"),
				password: formData.get("password"),
				name: formData.get("name"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			const error = await res.text();
			toast({
				title: "Error",
				description: error,
				variant: "destructive",
			});
		} else {
			router.push("/auth/signin");
			toast({
				title: "Success",
				description: "Account created successfully",
			});
		}

		setLoading(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="mx-auto w-full max-w-sm space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-bold">Create an Account</h1>
					<p className="text-sm text-muted-foreground">
						Enter your details below to create your account
					</p>
				</div>
				<form onSubmit={onSubmit} className="space-y-4">
					<Input name="name" placeholder="Name" required />
					<Input name="email" type="email" placeholder="Email" required />
					<Input
						name="password"
						type="password"
						placeholder="Password"
						required
					/>
					<Button className="w-full" type="submit" disabled={loading}>
						{loading ? "Creating Account..." : "Sign Up"}
					</Button>
				</form>
				<div className="text-center text-sm">
					Already have an account?{" "}
					<Link href="/auth/signin" className="text-primary hover:underline">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}
