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

// Étape 1 : Demander le code de vérification
export const requestVerificationCode = async (email) => {
   return await api.post('api/public/ticket-code-request', {
        json: { email }
      }).json();
  };

    // Étape 2 : Récupérer tous les tickets avec le code
  export const getAllTickets = async (email, code) => {
     return await api.post('api/purchase/all', {
        json: { email, code }
      }).json();  
  };
