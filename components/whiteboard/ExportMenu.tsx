"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { useWhiteboardStore } from "@/lib/stores/whiteboard";

export function ExportMenu() {
	const { elements } = useWhiteboardStore();

	const exportAsPNG = async () => {
		const canvas = document.createElement("canvas");
		// Set canvas size and draw elements
		const dataUrl = canvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.download = "whiteboard.png";
		link.href = dataUrl;
		link.click();
	};

	const exportAsSVG = () => {
		// Implement SVG export
	};

	const exportAsJSON = () => {
		const data = JSON.stringify(elements, null, 2);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.download = "whiteboard.json";
		link.href = url;
		link.click();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Download className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={exportAsPNG}>Export as PNG</DropdownMenuItem>
				<DropdownMenuItem onClick={exportAsSVG}>Export as SVG</DropdownMenuItem>
				<DropdownMenuItem onClick={exportAsJSON}>
					Export as JSON
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
