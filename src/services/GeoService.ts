export interface IGeoSuggestion {
  displayName: string;
  lat: string;
  lon: string;
}

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function searchLocations(query: string): Promise<IGeoSuggestion[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `${NOMINATIM_URL}?format=json&addressdetails=0&limit=5&q=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim request failed with status ${response.status}`);
  }

  const data = (await response.json()) as Array<{
    display_name: string;
    lat: string;
    lon: string;
  }>;

  return data.map((item) => ({
    displayName: item.display_name,
    lat: item.lat,
    lon: item.lon,
  }));
}

export function buildEmbedMapUrl(lat: string, lon: string): string {
  const delta = 0.02;
  const left = Number(lon) - delta;
  const right = Number(lon) + delta;
  const top = Number(lat) + delta;
  const bottom = Number(lat) - delta;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;
}
