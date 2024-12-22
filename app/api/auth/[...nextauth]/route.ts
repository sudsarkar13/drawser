import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { Session, User } from "next-auth";
import { AdapterUser } from "@auth/core/adapters";

type ExtendedSession = Session & {
	user: {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
};

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
	],
	callbacks: {
		session: async ({
			session,
			user,
		}: {
			session: Session;
			user: AdapterUser | User;
		}): Promise<ExtendedSession> => {
			return {
				...session,
				user: {
					...session.user,
					id: user.id,
				},
			};
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
