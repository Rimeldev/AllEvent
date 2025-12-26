import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CreateEvent() {
  const navigate = useNavigate();
  const handleCreate = (data) => {
    console.log("Créer événement", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
          {/* Bouton retour */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-start gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </button>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-2">Nouvel événement</h1>
        <p className="text-gray-500 mb-6">
          Ajouter une nouvelle événement
        </p>

      <EventForm mode="create" onSubmit={handleCreate} />
    </div>
    </div>

  );
}
