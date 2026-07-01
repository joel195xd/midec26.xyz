import { NextResponse } from "next/server";
import { getLatestVideos } from "@/lib/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maxResults = Number(searchParams.get("maxResults")) || 10;

  try {
    const videos = await getLatestVideos(maxResults);
    return NextResponse.json(videos);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
