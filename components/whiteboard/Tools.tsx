"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWhiteboardStore } from "@/lib/stores/whiteboard";
import {
	Circle,
	Eraser,
	Hand,
	Image,
	Minus,
	MousePointer,
	Pencil,
	Square,
	StickyNote,
	Type,
} from "lucide-react";

const tools = [
	{
		name: "Select",
		icon: MousePointer,
		type: "select",
	},
	{
		name: "Hand",
		icon: Hand,
		type: "hand",
	},
	{
		name: "Rectangle",
		icon: Square,
		type: "rectangle",
	},
	{
		name: "Circle",
		icon: Circle,
		type: "ellipse",
	},
	{
		name: "Line",
		icon: Minus,
		type: "line",
	},
	{
		name: "Pencil",
		icon: Pencil,
		type: "freedraw",
	},
	{
		name: "Text",
		icon: Type,
		type: "text",
	},
	{
		name: "Sticky",
		icon: StickyNote,
		type: "sticky",
	},
	{
		name: "Image",
		icon: Image,
		type: "image",
	},
	{
		name: "Eraser",
		icon: Eraser,
		type: "eraser",
	},
] as const;

export function Tools() {
	const { tool, setTool } = useWhiteboardStore();

	return (
		<div className="flex gap-1">
			{tools.map((t) => (
				<Button
					key={t.type}
					variant={tool === t.type ? "default" : "ghost"}
					size="icon"
					onClick={() => setTool(t.type)}
					className="h-8 w-8">
					<t.icon className="h-4 w-4" />
				</Button>
			))}
		</div>
	);
}
