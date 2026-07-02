import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const VIDEOS_DIR = join(process.cwd(), "public");

export async function GET() {
  try {
    const files = await readdir(VIDEOS_DIR);
    const mp4s = files
      .filter((f) => f.endsWith(".mp4"))
      .sort()
      .map((f) => ({
        file: f,
        alt: f.replace(/\.mp4$/, "").replace(/-/g, " "),
      }));
    return NextResponse.json({ videos: mp4s });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}
