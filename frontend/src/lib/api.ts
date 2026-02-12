const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export interface Team {
  id: number;
  name: string;
  category: string;
  sport_type: string;
  members_count: number;
  image_url: string | null;
  description: string | null;
}

export interface Tournament {
  id: number;
  name: string;
  category: string;
  date: string;
  location: string | null;
  status: string;
  description: string | null;
  image_url: string | null;
}

export interface Achievement {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string | null;
  team_id: number | null;
}

export interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string | null;
  description: string | null;
  image_url: string | null;
}

export interface Announcement {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  pinned: boolean;
}

export interface Sponsor {
  id: number;
  name: string;
  logo_url: string | null;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function getTeams(category?: string): Promise<Team[]> {
  const query = category ? `?category=${category}` : "";
  return fetchApi<Team[]>(`/api/teams${query}`);
}

export async function getTournaments(
  category?: string
): Promise<Tournament[]> {
  const query = category ? `?category=${category}` : "";
  return fetchApi<Tournament[]>(`/api/tournaments${query}`);
}

export async function getAchievements(
  category?: string
): Promise<Achievement[]> {
  const query = category ? `?category=${category}` : "";
  return fetchApi<Achievement[]>(`/api/achievements${query}`);
}

export async function getEvents(category?: string): Promise<Event[]> {
  const query = category ? `?category=${category}` : "";
  return fetchApi<Event[]>(`/api/events${query}`);
}
