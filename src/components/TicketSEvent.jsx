import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import EventMapSection from './EventMapSection.jsx';
import TicketPurchaseModal from './TicketPurchaseModal.jsx';
import EventTitle from './EventTitle.jsx';

export default function TicketSEvent({ tickets = [], eventId, eventTitle, event }) {
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const toggleTicketDetails = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const getProgressPercentage = (remaining, total) => {
    if (total === 0) return 0;
    return ((total - remaining) / total) * 100;
  };

  const handleBuyClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Si aucun ticket disponible
  if (tickets.length === 0) {
    return (
      <section className="py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto px-0 sm:px-8 md:px-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white bg-main-gradient rounded-full py-2 px-4 text-center w-full">
            CHOISIS TON PASS
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">Aucun billet disponible pour cet événement</p>
          </div>
        </div>
         <EventMapSection event={event} />
      </section>
    );
  }

  return (
    <div>
      {/* Section Tickets */}
      <section className="py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto px-0 sm:px-8 md:px-12">
          
          {/* Titre */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white bg-main-gradient rounded-full py-2 px-4 text-center w-full">
            CHOISIS TON PASS
          </h2>

          <div className="space-y-4">
            {tickets.map((ticket) => {
              const progressPercentage = getProgressPercentage(
                ticket.remaining_places, 
                ticket.available_places
              );
              const isSoldOut = ticket.remaining_places === 0;
              const isLowStock = ticket.remaining_places < ticket.available_places * 0.2 && !isSoldOut;

              return (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-md border border-[#DEE2E6] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-4 sm:p-5 md:p-6">
                    
                    {/* Ligne principale */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                      
                      {/* Type + prix + bouton détails */}
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                            {ticket.label}
                          </h3>
                          {isSoldOut && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                              COMPLET
                            </span>
                          )}
                          {isLowStock && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded">
                              DERNIÈRES PLACES
                            </span>
                          )}
                        </div>

                        <p className="text-xl sm:text-2xl font-bold text-black mb-3">
                          {ticket.price.toLocaleString()} FCFA
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
                              Reste : {ticket.remaining_places} / {ticket.available_places} Tickets
                            </span>
                          </div>

                          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 flex items-center justify-center ${
                                progressPercentage < 50
                                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                                  : progressPercentage < 80
                                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                                  : 'bg-gradient-to-r from-red-400 to-red-600'
                              }`}
                              style={{ width: `${progressPercentage}%` }}
                            >
                              <span className="text-[10px] sm:text-xs font-bold text-white px-2">
                                {Math.round(progressPercentage)}%
                              </span>
                            </div>
                          </div>

                          {/* Stats de vente */}
                          <p className="text-xs text-gray-500 mt-1">
                            {ticket.sold_count} billets vendus
                          </p>
                        </div>

                        {/* Bouton acheter */}
                        <button
                          onClick={() => handleBuyClick(ticket)}
                          disabled={isSoldOut}
                          className={`w-full sm:w-auto px-6 py-2 font-bold rounded-md 
                            transition-all duration-200 ${
                              isSoldOut
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105'
                            }`}
                        >
                          {isSoldOut ? 'COMPLET' : 'ACHETER'}
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
                          {ticket.description || "Aucune description disponible"}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EventMapSection event={event} />
      
      {/* Modal d'achat */}
      <TicketPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={eventTitle || <EventTitle />}
        ticket={selectedTicket}
        tickets={tickets}
        eventId={eventId}
      />
    </div>
  );
}