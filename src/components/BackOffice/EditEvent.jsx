import EventForm from "./EventForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditEvent() {
  const navigate = useNavigate();
  const existingEvent = {
    name: "EPAC 2025 - Journée de l'Étudiant",
    description: "La journée de l’étudiant de l’EPAC...",
    date: "2025-10-11",
    time: "19:00",
    image: "https://i.pinimg.com/1200x/65/44/27/654427a9af0c7ccc34c7b1265f2b8e9e.jpg",
    location: "EPAC Campus, Paris",
    tickets: [
      { type: "Standard", price: 15, quantity: 100 },
      { type: "VIP", price: 50, quantity: 20 },
    ],
  };

  const handleUpdate = (data) => {
    console.log("Modifier événement", data);
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-16">
      {/* Bouton retour */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-start gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </button>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-2">Modifier l’événement</h1>
        <p className="text-gray-500 mb-6">
          Mettez à jour les informations de votre événement
        </p>

        <EventForm
          mode="edit"
          initialData={existingEvent}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
