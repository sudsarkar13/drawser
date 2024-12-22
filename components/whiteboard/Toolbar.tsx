"use client";

import { Button } from "@/components/ui/button";
import { useWhiteboardStore } from "@/lib/stores/whiteboard";
import { Tools } from "./Tools";
import { WhiteboardSettings } from "./Settings";
import { Undo2, Redo2, ZoomIn, ZoomOut, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Toolbar({ id }: { id: string }) {
	const { undo, redo, zoom, setZoom } = useWhiteboardStore();

	const handleZoomIn = () => setZoom(zoom + 0.1);
	const handleZoomOut = () => setZoom(Math.max(0.1, zoom - 0.1));

	return (
		<div className="flex items-center gap-2">
			<Tools />
			<Separator orientation="vertical" className="h-6" />
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="icon" onClick={undo}>
					<Undo2 className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" onClick={redo}>
					<Redo2 className="h-4 w-4" />
				</Button>
			</div>
			<Separator orientation="vertical" className="h-6" />
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="icon" onClick={handleZoomOut}>
					<ZoomOut className="h-4 w-4" />
				</Button>
				<span className="min-w-[3rem] text-center text-sm">
					{Math.round(zoom * 100)}%
				</span>
				<Button variant="ghost" size="icon" onClick={handleZoomIn}>
					<ZoomIn className="h-4 w-4" />
				</Button>
			</div>
			<Separator orientation="vertical" className="h-6" />
			<WhiteboardSettings id={id} />
		</div>
	);
}
