import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession["user"];
	}

	interface User {
		id: string;
		email: string;
		name?: string | null;
	}
}

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				const client = await clientPromise;
				const db = client.db();
				const user = await db.collection("users").findOne({
					email: credentials.email.toLowerCase(),
				});

				if (!user || !user.password) {
					throw new Error("User not found");
				}

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isValid) {
					throw new Error("Invalid password");
				}

				return {
					id: user._id.toString(),
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		newUser: "/auth/signup",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
