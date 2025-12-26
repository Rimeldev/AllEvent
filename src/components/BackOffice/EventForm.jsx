import { useState } from "react";
import { Calendar, Clock, MapPin, Upload, Save, X, Plus } from "lucide-react";

export default function EventForm({
  initialData = {},
  mode = "create",
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    type: initialData.type || "",
    image: initialData.image || "",
    description: initialData.description || "",
    date: initialData.date || "",
    time: initialData.time || "",
    map: initialData.map || "",
    locationDesc: initialData.locationDesc || "",
    paymentDeadline: initialData.paymentDeadline || "",
  });


  // État pour l'aperçu de l'image
  const [imagePreview, setImagePreview] = useState(initialData.image || null);

  // État pour gérer les tickets dynamiquement
  const [tickets, setTickets] = useState(
    initialData.tickets || [
      {
        id: Date.now(),
        name: "",
        places: "",
        price: "",
        description: "",
      },
    ]
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   // Gérer l'upload d'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result }); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer l'image
  const removeImage = () => {
    setImagePreview(null);
    setForm({ ...form, image: "" });
  };


  // Ajouter un nouveau ticket
  const addTicket = () => {
    const newTicket = {
      id: Date.now(),
      name: "",
      places: "",
      price: "",
      description: "",
    };
    setTickets([...tickets, newTicket]);
  };

  // Supprimer un ticket
  const removeTicket = (ticketId) => {
    // Garder au moins un ticket
    if (tickets.length > 1) {
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    }
  };

  // Mettre à jour un champ d'un ticket spécifique
  const handleTicketChange = (ticketId, field, value) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combiner les données du formulaire et des tickets
    onSubmit({ ...form, tickets });
  };

  const iconClass =
    "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Informations de l'événement</h2>
        <p className="text-sm text-gray-500">Tous les champs sont obligatoires</p>
      </div>

      {/* Nom */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Nom de l'événement *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Ex: EPAC 2025 - Journée de l'étudiant"
          required
        />
      </div>

      {/* Type */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Type d'événement *
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">Choisissez le type</option>
          <option>Concert</option>
          <option>Conférence</option>
          <option>Festival</option>
        </select>
      </div>

       {/* Image Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Image de l'événement *
        </label>
        
        {/* Zone d'upload */}
        <div className="space-y-3">
          {/* Aperçu de l'image si présente */}
          {imagePreview && (
            <div className="relative w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-full object-cover"
              />
              {/* Bouton supprimer l'image */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                title="Supprimer l'image"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Input caché + bouton personnalisé */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-colors w-full justify-center"
            >
              <Upload size={18} className="text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">
                {imagePreview ? "Changer l'image" : "Cliquer pour uploader une image"}
              </span>
            </label>
          </div>

          <p className="text-xs text-gray-500">
            Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Description de l'événement *
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      {/* Date / Heure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Date de l'événement *
          </label>
          <div className="relative">
            <Calendar className={iconClass} />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Heure de l'événement *
          </label>
          <div className="relative">
            <Clock className={iconClass} />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
              required
            />
          </div>
        </div>
      </div>

      {/* Lieu google map */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Lieu de l'événement (Google Map)
        </label>
        <div className="relative">
          <MapPin className={iconClass} />
          <input
            name="map"
            value={form.map}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
            placeholder="Ajouter le lien google map du lieu"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Lieu de l'événement (Description) *
        </label>
        <div className="relative">
          <MapPin className={iconClass} />
          <input
            name="locationDesc"
            value={form.locationDesc}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
            placeholder="Décriver un peu le lieu"
            required
          />
        </div>
      </div>

      {/* Section Tickets */}
      <div className=" pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tickets</h3>
          <button
            type="button"
            onClick={addTicket}
            className="flex items-center gap-2 border border-orange-500 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Ajouter un ticket
          </button>
        </div>

        {/* Liste des tickets */}
        <div className="space-y-6">
          {tickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 relative bg-gray-50"
            >
              {/* Bouton supprimer (seulement si plus d'un ticket) */}
              {tickets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicket(ticket.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                  title="Supprimer ce ticket"
                >
                  <X size={18} />
                </button>
              )}

              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Ticket {index + 1}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom du ticket */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Nom du ticket *
                  </label>
                  <input
                    value={ticket.name}
                    onChange={(e) =>
                      handleTicketChange(ticket.id, "name", e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Ex: VIP, Standard, Premium"
                    required
                  />
                </div>

                {/* Places disponibles */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Places disponibles *
                  </label>
                  <input
                    type="number"
                    value={ticket.places}
                    onChange={(e) =>
                      handleTicketChange(ticket.id, "places", e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>

                {/* Prix */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Prix du ticket (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) =>
                      handleTicketChange(ticket.id, "price", e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="5000"
                    min="0"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Description / Avantages
                  </label>
                  <input
                    value={ticket.description}
                    onChange={(e) =>
                      handleTicketChange(ticket.id, "description", e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Les avantages du ticket"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date limite de paiement */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Date de limite de paiement *
        </label>
        <div className="relative">
          <Calendar className={iconClass} />
          <input
            type="date"
            name="paymentDeadline"
            value={form.paymentDeadline}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
            required
          />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="border border-gray-300 shadow-md hover:bg-gray-100 px-6 py-2 rounded-md text-gray-700 font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-main-gradient btn-gradient flex gap-2 items-center justify-center text-white px-6 py-2 rounded-md font-semibold hover:shadow-lg transition-shadow"
        >
          <Save className="w-4 h-4" />
          <span>{mode === "create" ? "Créer l'événement" : "Enregistrer"}</span>
        </button>
      </div>
    </form>
  );
}