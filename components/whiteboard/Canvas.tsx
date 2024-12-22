"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";
import { useWhiteboardStore } from "@/lib/stores/whiteboard";
import { WhiteboardElement } from "@/lib/models/whiteboard";
import { cn } from "@/lib/utils";

// Add this type import for RoughCanvas
type RoughCanvas = ReturnType<typeof rough.canvas>;

export function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { elements } = useWhiteboardStore();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const roughCanvas = rough.canvas(canvas);

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw all elements
		elements.forEach((element) => {
			drawElement(roughCanvas, element);
		});
	}, [elements]);

	const drawElement = (
		roughCanvas: RoughCanvas,
		element: WhiteboardElement
	) => {
		switch (element.type) {
			case "rectangle":
				roughCanvas.draw(
					rough
						.generator()
						.rectangle(element.x, element.y, element.width, element.height, {
							stroke: element.strokeColor,
							roughness: element.roughness,
							strokeWidth: element.strokeWidth,
						})
				);
				break;
			// Add other element type handling
		}
	};

	// Add mouse event handlers for drawing

	return (
		<div className="relative w-full h-full overflow-hidden">
			<canvas
				ref={canvasRef}
				className={cn("absolute inset-0")}
				width={window.innerWidth}
				height={window.innerHeight}
			/>
		</div>
	);
}
