import api from "./api";

export const createTicket = async (data) => {
  return api.post("api/ticket/create", {
    json: data
  }).json();
};

export const updateTicket = async (ticketId, ticketData) => {
  return await api.put(`api/ticket/${ticketId}/update`, {
    json: ticketData,
  }).json();
};

export const deleteTicket = async (ticketId) => {
  return await api.delete(`api/ticket/${ticketId}/delete`).json();
};