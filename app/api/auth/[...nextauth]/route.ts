import NextAuth, {
	AuthOptions,
	NextAuthOptions,
	DefaultSession,
} from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import GoogleProvider from "next-auth/providers/google";

// Extend the built-in session type
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession["user"];
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
				const users = client.db().collection("users");
				const user = await users.findOne({ email: credentials.email });

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
	},
	session: {
		strategy: "jwt" as const,
	},
	callbacks: {
		async jwt({ token, user }) {
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
