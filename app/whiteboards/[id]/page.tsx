import { Canvas } from "@/components/whiteboard/Canvas";
import { Toolbar } from "@/components/whiteboard/Toolbar";
import { ExportMenu } from "@/components/whiteboard/ExportMenu";

export default function WhiteboardPage({ params }: { params: { id: string } }) {
	return (
		<div className="h-screen flex flex-col">
			<header className="border-b p-4 flex justify-between items-center">
				<Toolbar />
				<ExportMenu />
			</header>

			<main className="flex-1 relative">
				<Canvas />
			</main>
		</div>
	);
}
