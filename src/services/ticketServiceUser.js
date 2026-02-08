import api from "./api";
import { encryptData } from "../components/encryption";

// Récupérer la clé Fernet depuis les variables d'environnement
const FERNET_KEY = import.meta.env.VITE_FERNET_KEY;

export const ticketService = {
  // Étape 1 : Demander le code de vérification
  requestVerificationCode: async (email) => {
    try {
      const response = await api.post('api/public/ticket-code-request', {
        json: { email }
      }).json();
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Étape 2 : Récupérer tous les tickets avec le code
  getAllTickets: async (email, code) => {
    try {
      // Vérifier que la clé existe
      if (!FERNET_KEY) {
        throw new Error('VITE_FERNET_KEY is not defined in environment variables');
      }

      // Créer le payload
      const payload = {
        email: email,
        code: code,
        timestamp: Math.floor(Date.now() / 1000) // timestamp unix en secondes
      };

      console.log('Payload avant chiffrement:', payload);

      // Chiffrer le payload avec la clé Fernet
      const encryptedPayload = await encryptData(payload, FERNET_KEY);

      console.log('Payload chiffré:', encryptedPayload);

      // Faire la requête GET avec le paramètre _p
      const response = await api.get('api/purchase/all', {
        searchParams: {
          _p: encryptedPayload
        }
      }).json();

      return response;
    } catch (error) {
      console.error('Erreur dans getAllTickets:', error);
      throw error;
    }
  },


  // Nouvelle méthode : Vérifier un ticket via QR code
  verifyTicket: async (qrId) => {
    try {
      const response = await api.get(`api/purchase/${qrId}/verify`).json();
      return response;
    } catch (error) {
      throw error;
    }
  }
};