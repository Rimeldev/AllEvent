export async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Adresse introuvable");
  }

  return {
    latitude: data[0].lat,
    longitude: data[0].lon,
    city:
      data[0].address?.city ||
      data[0].address?.town ||
      data[0].address?.village ||
      "",
  };
}

export async function searchAddress(query) {
  if (!query || query.length < 3) return [];

  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.map((item) => ({
    label: item.display_name,
    latitude: item.lat,
    longitude: item.lon,
    city:
      item.address?.city ||
      item.address?.town ||
      item.address?.village ||
      "",
  }));
}

