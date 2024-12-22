"use client";

import { Button } from "@/components/ui/button";
import { useWhiteboardStore } from "@/lib/stores/whiteboard";
import {
	Square,
	Circle,
	ArrowRight,
	Type,
	Minus,
	Pencil,
	MousePointer,
} from "lucide-react";

const tools = [
	{ type: "select", icon: MousePointer },
	{ type: "rectangle", icon: Square },
	{ type: "ellipse", icon: Circle },
	{ type: "arrow", icon: ArrowRight },
	{ type: "text", icon: Type },
	{ type: "line", icon: Minus },
	{ type: "freedraw", icon: Pencil },
] as const;

export function Toolbar() {
	const { tool, setTool } = useWhiteboardStore();

	return (
		<div className="flex gap-2">
			{tools.map((t) => (
				<Button
					key={t.type}
					variant={tool === t.type ? "default" : "outline"}
					size="icon"
					onClick={() => setTool(t.type)}>
					<t.icon className="h-4 w-4" />
				</Button>
			))}
		</div>
	);
}
