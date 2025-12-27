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

export const createEvent = async (formData) => {
  try {
    // 🔥 Retirer explicitement le Content-Type pour cette requête
    const response = await api.post("api/event/create", {
      body: formData,
      timeout: 60000, // 60 secondes
      headers: {
        // Ne pas définir Content-Type, ky le fera automatiquement
      }
    }).json();
    
    return response;
  } catch (error) {
    console.error("❌ Erreur API détaillée:", error);
    
    if (error.response) {
      const errorData = await error.response.json().catch(() => null);
      console.error("📛 Détails erreur API:", errorData);
      
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    
    throw error;
  }
};

export const updateEvent = async (eventId, formData) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  try {
    // 🔥 Logger ce qu'on envoie
    console.log("📤 UPDATE - Données envoyées:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    const response = await api.put(`api/event/${eventId}/update`, {
      body: formData,
      timeout: 60000,
    }).json();
    
    return response;
  } catch (error) {
    console.error("❌ Erreur modification événement:", error);
    
    if (error.response) {
      const errorData = await error.response.json().catch(() => null);
      console.error("📛 Détails erreur API COMPLETS:", errorData);
      
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    
    throw error;
  }
};