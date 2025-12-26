import api from "./api";

export const getStats = async () => {
  return await api.get("api/stats").json();
};

export const getStatsAdmin = async (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  return await api.get(`api/event/${eventId}/stats`).json();
};

