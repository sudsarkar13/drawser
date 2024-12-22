import { NextResponse } from "next/server";

export function handleAuthError(error: unknown) {
	console.error("Auth error:", error);

	if (error instanceof Error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

	return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
