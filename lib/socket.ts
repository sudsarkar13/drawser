import { Server as NetServer } from "http";
import { Server as SocketServer } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export type NextApiResponseWithSocket = NextApiResponse & {
	socket: {
		server: NetServer & {
			io?: SocketServer;
		};
	};
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default function SocketHandler(
	req: NextApiRequest,
	res: NextApiResponseWithSocket
) {
	if (!res.socket.server.io) {
		const io = new SocketServer(res.socket.server);
		res.socket.server.io = io;

		io.on("connection", (socket) => {
			socket.on("join-room", (roomId: string) => {
				socket.join(roomId);
			});

			socket.on("element-update", (roomId: string, element: any) => {
				socket.to(roomId).emit("element-update", element);
			});

			socket.on("element-delete", (roomId: string, elementId: string) => {
				socket.to(roomId).emit("element-delete", elementId);
			});
		});
	}

	res.end();
}
