import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import EventForm from "./EventForm";
import { getEventAdminById, updateEvent } from "../../services/eventService";
import { updateTicket, createTicket, deleteTicket } from "../../services/ticketService";

export default function EditEvent() {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Récupérer l'ID depuis l'URL
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [eventData, setEventData] = useState(null);

  // Charger les données de l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoadingData(true);
        const response = await getEventAdminById(eventId);
        
        if (response.success) {
          const event = response.data;
          
          // Formater les données pour le formulaire
          const startDate = new Date(event.started_at);
          const endDate = new Date(event.ended_at);
          const dueDate = new Date(event.ticket_due_payment_date);
          
          setEventData({
            name: event.name,
            description: event.description,
            type: event.type || "",
            city: event.city,
            address: event.address,
            locationDesc: event.city, // ou event.address selon votre choix
            addressInput: event.address,
            latitude: event.latitude,
            longitude: event.longitude,
            startDate: startDate.toISOString().split('T')[0],
            startTime: startDate.toTimeString().slice(0, 5),
            endDate: endDate.toISOString().split('T')[0],
            endTime: endDate.toTimeString().slice(0, 5),
            ticket_due_payment_date: dueDate.toISOString().split('T')[0],
            image: event.images?.[0]?.url || null,
            tickets: event.tickets?.map(ticket => ({
              id: ticket.id,
              name: ticket.label || "",
              places: ticket.available_places,
              price: ticket.price,
              description: ticket.description || "",
              isExisting: true // Marqueur pour savoir si c'est un ticket existant
            })) || []
          });
        }
      } catch (error) {
        console.error("Erreur chargement événement:", error);
        toast.error("Impossible de charger l'événement");
        navigate("/dashboard");
      } finally {
        setLoadingData(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId, navigate]);

  const handleUpdate = async (formData, tickets) => {
    try {
      setLoading(true);
      console.log("🚀 Début modification événement...");
      

      // 1️⃣ Mettre à jour l'événement
      const eventRes = await updateEvent(eventId, formData);
      
      console.log("✅ Réponse modification événement:", eventRes);

      if (!eventRes.success) {
        throw new Error(eventRes.message || "Erreur modification événement");
      }

      // 2️⃣ Gérer les tickets
      console.log("🎫 Gestion des tickets...");
      
      const existingTickets = eventData.tickets.filter(t => t.isExisting);
      const existingTicketIds = existingTickets.map(t => t.id);

      for (const ticket of tickets) {
        const ticketData = {
          event_id: eventId,
          label: ticket.name,
          available_places: Number(ticket.places),
          price: Number(ticket.price),
          description: ticket.description,
        };

        if (ticket.isExisting && ticket.id) {
          // Modifier un ticket existant
          console.log("📝 Modification ticket:", ticket.id, ticketData);
          await updateTicket(ticket.id, ticketData);
        } else {
          // Créer un nouveau ticket
          console.log("➕ Création nouveau ticket:", ticketData);
          await createTicket(ticketData);
        }
      }

      // 3️⃣ Supprimer les tickets qui ont été retirés
      const currentTicketIds = tickets.filter(t => t.isExisting).map(t => t.id);
      const ticketsToDelete = existingTicketIds.filter(id => !currentTicketIds.includes(id));
      
      for (const ticketId of ticketsToDelete) {
        console.log("🗑️ Suppression ticket:", ticketId);
        await deleteTicket(ticketId);
      }

      toast.success("Événement modifié avec succès !");
      navigate("/dashboard");

    } catch (error) {
      console.error("❌ ERREUR COMPLÈTE:", error);
      const errorMessage = error.message || "Erreur lors de la modification";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-16">
        <div className="max-w-3xl items-center justify-center min-h-screen mx-auto p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-16">
        <div className="max-w-3xl mx-auto p-6 text-center">
          <p className="text-red-600">Événement introuvable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-16">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-start gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </button>
      
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-2">Modifier l'événement</h1>
        <p className="text-gray-500 mb-6">
          Mettez à jour les informations de votre événement
        </p>

        <EventForm
          mode="edit"
          initialData={eventData}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
}