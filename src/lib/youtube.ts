const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UC3uWpaYy8JErOPY6SZOgPUA";
const YOUTUBE_BASE = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export async function getLatestVideos(maxResults = 10): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YOUTUBE_API_KEY is not set");
  }

  const url = new URL(`${YOUTUBE_BASE}/search`);
  url.searchParams.set("key", YOUTUBE_API_KEY);
  url.searchParams.set("channelId", CHANNEL_ID);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("order", "date");
  url.searchParams.set("maxResults", String(maxResults));

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`YouTube API error: ${res.status}`);
  }

  const data = await res.json();

  return data.items.map((item: Record<string, unknown>) => {
    const snippet = item.snippet as Record<string, unknown>;
    const thumbnails = snippet.thumbnails as Record<string, Record<string, string>>;
    return {
      id: item.id as string,
      title: snippet.title as string,
      thumbnail: thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default?.url ?? "",
      publishedAt: snippet.publishedAt as string,
    };
  });
}
