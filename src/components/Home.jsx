import { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import { Search, Ticket } from "lucide-react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
 import event1 from "../assets/images/event1.png";
 import event2 from "../assets/images/event2.png";

const events = [
  {
    id: 1,
    image: event1,
    badge: " Concert",
    title: "YANO BABY",
    subtitle: "TOUS ENSEMBLE AU PALAIS DES CONGRÈS DE LOMÉ",
    organizer: "FIRTHY CHILL EPAC",
    date: "sam. 17 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "available", // available, selling-fast, sold-out
    isFavorite: false
  },
  {
    id: 2,
    image: event2,
    badge: " Concert",
    title: "MAMA BABY",
    subtitle: "CONCERT LIVE",
    organizer: "FIRTHY CHILL EPAC",
    date: "dim. 18 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "available",
    isFavorite: true
  },
  {
    id: 3,
    image: event1,
    badge: "Cala",
    title: "YANO BABY",
    subtitle: "TOUS ENSEMBLE AU PALAIS DES CONGRÈS DE LOMÉ",
    organizer: "FIRTHY CHILL EPAC",
    date: "lun. 19 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "selling-fast",
    isFavorite: false
  },
  {
    id: 4,
     image: event2,
    badge: "Gala",
    title: "YANO BABY",
    subtitle: "TOUS ENSEMBLE AU PALAIS DES CONGRÈS DE LOMÉ",
    organizer: "FIRTHY CHILL EPAC",
    date: "mar. 20 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "available",
    isFavorite: false
  },
    {
    id: 5,
     image: event1,
    badge: "ALERTE!",
    title: "YANO BABY",
    subtitle: "TOUS ENSEMBLE AU PALAIS DES CONGRÈS DE LOMÉ",
    organizer: "FIRTHY CHILL EPAC",
    date: "sam. 17 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "available", // available, selling-fast, sold-out
    isFavorite: false
  },
  {
    id: 6,
     image: event2,
    badge: " Concert",
    title: "MAMA BABY",
    subtitle: "CONCERT LIVE",
    organizer: "FIRTHY CHILL EPAC",
    date: "dim. 18 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "available",
    isFavorite: true
  },
  {
    id: 7,
     image: event1,
    badge: "Gala",
    title: "YANO BABY",
    subtitle: "TOUS ENSEMBLE AU PALAIS DES CONGRÈS DE LOMÉ",
    organizer: "FIRTHY CHILL EPAC",
    date: "lun. 19 déc. 2025 | après-midi",
    price: "À partir de 2 000 F CFA",
    location: "Cotonou, Bénin",
    status: "selling-fast",
    isFavorite: false
  },
];

export default function Home() {
    const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };


  return (
   <div className="w-full">
    <Hero />
   <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
  <div className="max-w-7xl mx-auto mb-8 flex flex-col items-center text-center gap-6">
    
    <h2 className="text-2xl font-primary md:text-4xl font-extrabold">
      Événement à venir : Billets disponibles
    </h2>
   {/* Barre gradient */}
    <div className="h-1.5 w-56 md:w-72 rounded-full bg-main-gradient"
    />

    <div className="mt-4 relative w-full max-w-md">
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full px-4 py-1 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-1 rounded-lg hover:bg-orange-600">
        <Search className="w-4 h-4" />
      </button>
    </div>

  </div>
   {/* Grille d'événements */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id} className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image avec badge et favori */}
            <div  onClick={() => handleEventClick(event.id)}  className="relative h-48 overflow-hidden cursor-pointer">
 {/* Image floue background */}
      <div
        className="absolute inset-0 blur-xs  scale-110"
        style={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-white/50" />

      {/* Image principale nette */}
      <img
        src={event.image}
        alt={event.title}
        className="relative mx-auto object-cover z-20 rounded-b-xl"
      />
              
              <span className="flex gap-1 absolute top-3 left-3 bg-main-gradient text-white text-xs font-bold px-3 py-1 rounded z-30">
              <Icon icon="iconamoon:badge-fill" width="16" height="16" />  {event.badge}
              </span>
            </div>

            {/* Contenu */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-4">{event.organizer}</h3>

              {/* Date */}
              <div className="flex items-start gap-2 mb-2 text-sm text-black font-bold">
                <Icon icon="bxs:calendar" width="20" height="20" />
                <span>{event.date}</span>
              </div>

              {/* Prix */}
              <div className="flex items-center gap-2 mb-2 text-md text-[#855DDE] font-bold">
                <Icon icon="mdi:money" width="30" height="30" />
                <span>{event.price}</span>
              </div>

              {/* Localisation */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Icon icon="bxs:map" width="20" height="20" />
                <span>{event.location}</span>
              </div>

              {/* Bouton d'action */}
              <button 
                 onClick={() => handleEventClick(event.id)} className="w-full text-white text-sm bg-main-gradient cursor-pointer hover:bg-main-gradient/50 font-semibold py-2 rounded-full transition-colors">
                ACHETER MON TICKET
              </button>

              {/* Date de publication */}
              <p className="text-xs text-black mt-4">Publié le 08 sept. 2025</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-8 flex items-center">
        <button className="w-8 h-8 flex text-[#CD4711] items-center justify-center border border-[#CD4711] rounded hover:bg-gray-100">
          &lt;
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#CD4711] text-white rounded">
          1
        </button>
        <button className="w-8 h-8 flex text-[#CD4711] items-center justify-center border border-[#CD4711] rounded hover:bg-gray-100">
          2
        </button>
        <button className="w-8 h-8 flex text-[#CD4711] items-center justify-center border border-[#CD4711] rounded hover:bg-gray-100">
          &gt;
        </button>
      </div>
</section>

 {/* CTA */}
        <button
          className="flex items-center mx-auto gap-2 bg-[#E95503] text-white px-4 py-2 rounded-xl font-primary font-medium  hover:scale-105 transition-all"
        >
          <Ticket size={18} />
          <span>Mes Tickets</span>
        </button>

   </div>
  );
}