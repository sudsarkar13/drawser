import { create } from "zustand";
import { WhiteboardElement } from "@/lib/models/whiteboard";

interface WhiteboardState {
	elements: WhiteboardElement[];
	selectedElement: WhiteboardElement | null;
	tool:
		| "select"
		| "rectangle"
		| "ellipse"
		| "arrow"
		| "text"
		| "line"
		| "freedraw";
	addElement: (element: WhiteboardElement) => void;
	updateElement: (id: string, element: Partial<WhiteboardElement>) => void;
	deleteElement: (id: string) => void;
	setSelectedElement: (element: WhiteboardElement | null) => void;
	setTool: (tool: WhiteboardState["tool"]) => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
	elements: [],
	selectedElement: null,
	tool: "select",

	addElement: (element) =>
		set((state) => ({ elements: [...state.elements, element] })),

	updateElement: (id, element) =>
		set((state) => ({
			elements: state.elements.map((el) =>
				el.id === id ? { ...el, ...element } : el
			),
		})),

	deleteElement: (id) =>
		set((state) => ({
			elements: state.elements.filter((el) => el.id !== id),
		})),

	setSelectedElement: (element) => set({ selectedElement: element }),

	setTool: (tool) => set({ tool }),
}));
