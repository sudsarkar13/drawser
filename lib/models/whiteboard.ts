interface Point {
	x: number;
	y: number;
}

export interface Whiteboard {
	id: string;
	userId: string;
	name: string;
	content: WhiteboardContent;
	createdAt: Date;
	updatedAt: Date;
	collaborators?: string[];
}

export interface WhiteboardContent {
	version: number;
	elements: WhiteboardElement[];
	viewport: {
		x: number;
		y: number;
		zoom: number;
	};
}

export interface WhiteboardElement {
	id: string;
	type: "rectangle" | "ellipse" | "arrow" | "text" | "line" | "freedraw";
	x: number;
	y: number;
	width: number;
	height: number;
	angle: number;
	strokeColor: string;
	backgroundColor: string;
	fillStyle: string;
	strokeWidth: number;
	roughness: number;
	opacity: number;
	points?: Point[];
	text?: string;
	fontSize?: number;
	fontFamily?: string;
	textAlign?: string;
}
