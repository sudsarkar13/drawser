import { create } from "zustand";
import { WhiteboardElement } from "@/lib/models/whiteboard";

interface WhiteboardState {
	elements: WhiteboardElement[];
	selectedElement: WhiteboardElement | null;
	tool: "select" | "hand" | "rectangle" | "ellipse" | "arrow" | "text" | "line" | "freedraw" | "sticky" | "image" | "eraser";
	history: WhiteboardElement[][];
	historyIndex: number;
	zoom: number;
	pan: { x: number; y: number };
	addElement: (element: WhiteboardElement) => void;
	updateElement: (id: string, element: Partial<WhiteboardElement>) => void;
	deleteElement: (id: string) => void;
	setSelectedElement: (element: WhiteboardElement | null) => void;
	setTool: (tool: WhiteboardState["tool"]) => void;
	undo: () => void;
	redo: () => void;
	setZoom: (zoom: number) => void;
	setPan: (pan: { x: number; y: number }) => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
	elements: [],
	selectedElement: null,
	tool: "select",
	history: [[]],
	historyIndex: 0,
	zoom: 1,
	pan: { x: 0, y: 0 },

	addElement: (element) => 
		set((state) => {
			const newElements = [...state.elements, element];
			const newHistory = state.history.slice(0, state.historyIndex + 1);
			return {
				elements: newElements,
				history: [...newHistory, newElements],
				historyIndex: state.historyIndex + 1,
			};
		}),

	updateElement: (id, element) =>
		set((state) => {
			const newElements = state.elements.map((el) => 
				el.id === id ? { ...el, ...element } : el
			);
			const newHistory = state.history.slice(0, state.historyIndex + 1);
			return {
				elements: newElements,
				history: [...newHistory, newElements],
				historyIndex: state.historyIndex + 1,
			};
		}),

	deleteElement: (id) =>
		set((state) => {
			const newElements = state.elements.filter((el) => el.id !== id);
			const newHistory = state.history.slice(0, state.historyIndex + 1);
			return {
				elements: newElements,
				history: [...newHistory, newElements],
				historyIndex: state.historyIndex + 1,
			};
		}),

	setSelectedElement: (element) => set({ selectedElement: element }),
	setTool: (tool) => set({ tool }),
	
	undo: () => set((state) => {
		if (state.historyIndex > 0) {
			return {
				elements: state.history[state.historyIndex - 1],
				historyIndex: state.historyIndex - 1,
			};
		}
		return state;
	}),

	redo: () => set((state) => {
		if (state.historyIndex < state.history.length - 1) {
			return {
				elements: state.history[state.historyIndex + 1],
				historyIndex: state.historyIndex + 1,
			};
		}
		return state;
	}),

	setZoom: (zoom) => set({ zoom }),
	setPan: (pan) => set({ pan }),
}));
