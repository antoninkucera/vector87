import type { APIRoute } from 'astro';
import podcastsData from '../../data/podcasts-data.json';

// Return pruned JSON payload containing only fields required by the interactive UI
export const GET: APIRoute = async () => {
  const episodes = (podcastsData.episodes || []).map((ep) => ({
    id: ep.id,
    show_name: ep.show_name,
    title: ep.title,
    category: ep.category,
    release_date: ep.release_date,
    duration_ms: ep.duration_ms,
    external_url: ep.external_url,
    summary: ep.summary,
    description: ep.description,
    topics: ep.topics || [],
    keywords: ep.keywords || [],
    relevance_score: ep.relevance_score,
  }));

  const payload = {
    total_sources: podcastsData.sources?.length || 0,
    total_episodes: episodes.length,
    episodes,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};
