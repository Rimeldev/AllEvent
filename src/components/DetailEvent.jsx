import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, User, ChevronDown, ChevronUp } from "lucide-react";
import TicketSEvent from "./TicketSEvent";
import { getEventById } from "../services/eventService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function DetailEvent() {
  const { eventId } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef(null);

   // Charger les détails de l'événement
  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  useEffect(() => {
    if (descriptionRef.current && event?.description) {
      const element = descriptionRef.current;
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 3;
      setShowButton(element.scrollHeight > maxHeight);
    }
  }, [event?.description]);

  async function fetchEventDetails() {
    try {
      setLoading(true);
      const res = await getEventById(eventId);

      if (res.success && res.data) {
        setEvent(res.data);
      } else {
        toast.error(res.message || "Événement introuvable");
        navigate("/"); // Rediriger vers l'accueil si l'événement n'existe pas
      }
    } catch (error) {
      console.error("Erreur chargement événement:", error);
      toast.error("Impossible de charger l'événement");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

    // Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return "—";
  
  const date = new Date(dateString);
  
  // Vérifier si la date est valide
  if (isNaN(date.getTime())) return "—";
  
  // Options de formatage en français
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString('fr-FR', options);
};

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement de l'événement...</p>
      </div>
    );
  }

  // Si pas d'événement après le chargement
  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Événement introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* Image */}
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="w-full max-w-[600px] mx-auto lg:mx-0">
                <img
                  src={event.images?.[0]?.url || ""}
                  alt={event.name}
                  className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] rounded-xl shadow-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Infos */}
            <div className="flex-1 space-y-6">

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-black leading-tight">
                {event.name}
              </h1>

              {/* Description */}
              <div>
                <p
                  ref={descriptionRef}
                  className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-300 ${
                    !isExpanded ? "line-clamp-3" : ""
                  }`}
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    ...(isExpanded && { display: "block" }),
                  }}
                >
                  {event.description}
                </p>

                {showButton && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 mt-3 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        Lire moins <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Lire plus <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6 pt-4 border-t border-gray-200">

                {/* Date */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                      Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                     {formatDate(event.started_at)}
                    </p>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                      Lieu
                    </p>
                      <p className="text-lg font-semibold text-gray-900">
                      {event.address || event.city || "—"}
                    </p>
                    {event.address && event.city && (
                      <p className="text-sm text-gray-600">{event.city}</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section tickets */}
     <TicketSEvent 
        tickets={event.tickets || []} 
        eventId={event.id}
        eventTitle={event.name}
        event={event}
      />
    </div>
  );
}
