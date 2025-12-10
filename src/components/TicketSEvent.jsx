import React from 'react'
import { useState} from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import EventMapSection from './EventMapSection.jsx';
import TicketPurchaseModal from './TicketPurchaseModal.jsx';
import EventTitle from './EventTitle.jsx';

export default function TicketSEvent() {

  const [expandedTicket, setExpandedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

     const tickets = [
    {
      id: 1,
      type: "STANDARD",
      price: "2 000 FCFA",
      remaining: 50,
      total: 100,
      details: "Vue sur la scène, devant le podium"
    },
    {
      id: 2,
      type: "PREMIUM",
      price: "10 000 FCFA",
      remaining: 60,
      total: 100,
      details: "Accès prioritaire, zone premium avec vue optimale"
    },
    {
      id: 3,
      type: "VIP",
      price: "50 000 FCFA",
      remaining: 10,
      total: 20,
      details: "Accès backstage, rencontre avec les artistes, zone exclusive"
    }
  ];

  const toggleTicketDetails = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const getProgressPercentage = (remaining, total) => {
    return ((total - remaining) / total) * 100;
  };
  return (
    <div> {/* Section Tickets */}
     <section className="py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto px-0 sm:px-8 md:px-12">
    
    {/* Titre */}
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white bg-main-gradient rounded-full py-2 px-4 text-center w-full">
      CHOISIS TON PASS
    </h2>

    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white rounded-lg shadow-md border border-[#DEE2E6] transition-all duration-300 hover:shadow-lg"
        >
          <div className="p-4 sm:p-5 md:p-6">
            
            {/* Ligne principale */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              
              {/* Type + prix + bouton détails */}
              <div className="flex-1 w-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-1">
                  {ticket.type}
                </h3>

                <p className="text-xl sm:text-2xl font-bold text-black mb-3">
                  {ticket.price}
                </p>

                <button
                  onClick={() => toggleTicketDetails(ticket.id)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1"
                >
                  Détails
                  {expandedTicket === ticket.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Progress + bouton acheter */}
              <div className="flex-1 flex flex-col items-start sm:items-end gap-3 w-full">

                {/* Progression */}
                <div className="w-full sm:max-w-[260px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs sm:text-sm text-black font-semibold">
                      Reste : {ticket.remaining} Tickets
                    </span>
                  </div>

                  <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 flex items-center justify-center"
                      style={{ width: `${getProgressPercentage(ticket.remaining, ticket.total)}%` }}
                    >
                      <span className="text-[10px] sm:text-xs font-bold text-white px-2">
                        {Math.round(getProgressPercentage(ticket.remaining, ticket.total))}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bouton acheter */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 
                  hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-md 
                  transition-all duration-200 hover:scale-105"
                >
                  ACHETER
                </button>
              </div>
            </div>

            {/* Détails dépliants */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedTicket === ticket.id ? "max-h-40 mt-4" : "max-h-0"
              }`}
            >
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {ticket.details}
                </p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <EventMapSection />
      
      {/* Modal d'achat */}
      <TicketPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={<EventTitle />}
        tickets={tickets}
      />
      </div>
  )
}
