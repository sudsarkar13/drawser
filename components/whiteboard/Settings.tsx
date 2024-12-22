"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function WhiteboardSettings({ id }: { id: string }) {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const res = await fetch(`/api/whiteboards/${id}`, {
			method: "PATCH",
			body: JSON.stringify({
				name: formData.get("name"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			toast({
				title: "Error",
				description: "Failed to update whiteboard",
				variant: "destructive",
			});
		} else {
			setOpen(false);
			toast({
				title: "Success",
				description: "Whiteboard updated successfully",
			});
		}

		setLoading(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<Settings2 className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Whiteboard Settings</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Name
						</label>
						<Input id="name" name="name" placeholder="Untitled Whiteboard" />
					</div>
					<Button type="submit" disabled={loading}>
						{loading ? "Saving..." : "Save Changes"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
