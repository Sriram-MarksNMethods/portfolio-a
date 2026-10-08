import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// Leaves preview mode (if a draft preview was opened outside the dashboard).
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
