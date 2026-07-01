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
  // Try API first
  if (YOUTUBE_API_KEY) {
    const url = new URL(`${YOUTUBE_BASE}/search`);
    url.searchParams.set("key", YOUTUBE_API_KEY);
    url.searchParams.set("channelId", CHANNEL_ID);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("type", "video");
    url.searchParams.set("order", "date");
    url.searchParams.set("maxResults", String(maxResults));

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (res.ok) {
      const data = await res.json();
      return data.items.map((item: Record<string, unknown>) => {
        const id = item.id as Record<string, string>;
        const snippet = item.snippet as Record<string, unknown>;
        const thumbnails = snippet.thumbnails as Record<string, Record<string, string>>;
        return {
          id: id.videoId,
          title: snippet.title as string,
          thumbnail: thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default?.url ?? "",
          publishedAt: snippet.publishedAt as string,
        };
      });
    }
  }

  // Fallback: YouTube RSS feed (no API key needed)
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const res = await fetch(rssUrl, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`YouTube RSS error: ${res.status}`);
  }

  const xml = await res.text();
  const videos: YouTubeVideo[] = [];
  const entries = xml.split("<entry>").slice(1, maxResults + 1);

  for (const entry of entries) {
    const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entry.match(/<media:group>[\s\S]*?<media:title>(.*?)<\/media:title>/);
    const dateMatch = entry.match(/<published>(.*?)<\/published>/);
    const thumbMatch = entry.match(/<media:thumbnail url="(.*?)"/);

    if (idMatch && titleMatch) {
      videos.push({
        id: idMatch[1],
        title: titleMatch[1],
        thumbnail: thumbMatch
          ? thumbMatch[1].replace("hqdefault", "hqdefault")
          : `https://i.ytimg.com/vi/${idMatch[1]}/hqdefault.jpg`,
        publishedAt: dateMatch ? dateMatch[1] : new Date().toISOString(),
      });
    }
  }

  return videos;
}
