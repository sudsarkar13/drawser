import { createServer } from "http";
import { Server } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: process.env.NEXT_PUBLIC_APP_URL,
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("Client connected");

	socket.on("join-room", (roomId: string) => {
		socket.join(roomId);
		console.log(`Client joined room: ${roomId}`);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const port = parseInt(process.env.SOCKET_PORT || "3001", 10);
httpServer.listen(port, () => {
	console.log(`Socket server running on port ${port}`);
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
