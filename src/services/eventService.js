import api from "./api";

export const getAllEvents = async ({ page = 1, per_page = 10, q } = {}) => {
  return await api.get("api/event/admin/all", {
      searchParams: { page, per_page, q },
    })
    .json();
};

export const getPublicAllEvents = async ({ page = 1, per_page = 10, q } = {}) => {
  return await api.get("api/event/all", {
      searchParams: { page, per_page, q },
    })
    .json();
};

export const getEventById = async (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }
  
  return await api.get(`api/event/${eventId}/get`)
    .json();
};

export const getEventAdminById = async (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  return await api.get(`api/event/admin/${eventId}/get`)
    .json();
};