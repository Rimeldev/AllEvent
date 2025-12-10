import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import eventImage from "../assets/images/event1.png";
import TicketSEvent from "./TicketSEvent";

export default function DetailEvent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef(null);

  // Image placeholder pour la démo

  const event = {
    image: eventImage,
    badge: "Concert",
    title: "Firthy Chill INSTI",
    description:
      "Le Firthy Chill INSTI arrive enfin à Cotonou pour une expérience inoubliable ! Rendez-vous dans le plus grand amphithéâtre de l'INSTI, au cœur de l'Université d'Abomey-Calavi. Préparez-vous à quatre soirées offertes par de la bonne ambiance.re de l'INSTI, au cœur de l'Université d'Abomey-Calavi. Préparez-vous à quatre soirées offertes par de la bonne ambiance.re de l'INSTI, au cœur de l'Université d'Abomey-Calavi. Préparez-vous à quatre soirées offertes par de la bonne ambiance.",
    date: "dim. 7 déc. 2025 | après-midi",
    location: "Cotonou, Bénin",
    organizer: "Amiphie Music, INSTI, UAC",
  };

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      // Vérifier si le contenu dépasse 3 lignes
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 3;
      setShowButton(element.scrollHeight > maxHeight);
    }
  }, [event.description]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col px-16 lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Image - Taille fixe */}
            <div className="w-full lg:w-auto flex-shrink-0">
              <div className="w-full max-w-[500px] mx-auto lg:mx-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-auto min-h-[400px] rounded-lg shadow-2xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Informations de l'événement */}
            <div className="flex-1 space-y-6">

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-black leading-tight">
                {event.title}
              </h1>
              
              <div>
                <p 
                  ref={descriptionRef}
                  className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-300 ${
                    !isExpanded ? 'line-clamp-3' : ''
                  }`}
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    ...(isExpanded && { display: 'block' })
                  }}
                >
                  {event.description}
                </p>
                
                {showButton && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 mt-3 transition-colors duration-200"
                    aria-expanded={isExpanded}
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

              {/* Détails */}
              <div className="space-y-5 pt-4 border-t border-gray-200">
                {/* Date */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                      Date
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      {event.date}
                    </p>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                      Lieu
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Organisateur */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                      Organisé par
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      {event.organizer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section supplémentaire - Description détaillée */}
      <TicketSEvent />
     
    </div>
  );
}