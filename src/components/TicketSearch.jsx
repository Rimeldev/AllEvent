import React, { useState } from 'react';
import { Ticket, Mail, Search, KeyRound } from 'lucide-react';

// Composant pour un ticket avec QR code
const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* QR Code */}
      <div className="flex justify-center mb-3">
        <div className="w-32 h-32 bg-main-gradient btn-gradient rounded-lg flex items-center justify-center">
          <div className="w-28 h-28 bg-white rounded flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              {/* QR Code simulé */}
              <rect x="0" y="0" width="100" height="100" fill="white"/>
              <rect x="10" y="10" width="15" height="15" fill="black"/>
              <rect x="75" y="10" width="15" height="15" fill="black"/>
              <rect x="10" y="75" width="15" height="15" fill="black"/>
              <rect x="30" y="20" width="5" height="5" fill="black"/>
              <rect x="40" y="30" width="5" height="5" fill="black"/>
              <rect x="50" y="40" width="10" height="10" fill="black"/>
              <rect x="65" y="35" width="5" height="5" fill="black"/>
              <rect x="35" y="60" width="8" height="8" fill="black"/>
              <rect x="60" y="65" width="6" height="6" fill="black"/>
              <rect x="20" y="50" width="7" height="7" fill="black"/>
              <rect x="70" y="55" width="8" height="8" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Détails du ticket */}
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <Ticket className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-gray-500">Ticket</p>
            <p className="font-semibold text-gray-900">{ticket.id}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-gray-900 break-all">{ticket.email}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Date d'achat</p>
            <p className="font-medium text-gray-900">{ticket.purchaseDate}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Pass</p>
            <p className="font-semibold text-gray-900">{ticket.passType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MesTickets() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [ticketsFound, setTicketsFound] = useState(null);

  // Données de démonstration
  const mockTickets = [
    {
      id: 'LOMX1234',
      email: 'votre.email@example.com',
      purchaseDate: '5 décembre 2025',
      passType: 'VIP'
    },
    {
      id: 'LOMX5678',
      email: 'votre.email@example.com',
      purchaseDate: '5 décembre 2025',
      passType: 'PREMIUM'
    },
    {
      id: 'LOMX9012',
      email: 'votre.email@example.com',
      purchaseDate: '5 décembre 2025',
      passType: 'MTN'
    }
  ];

  const handleSearch = () => {
    setHasSearched(true);
    // Simulation : si code de vérification rempli, afficher les tickets
    if (verificationCode.trim()) {
      setTicketsFound(mockTickets);
    } else {
      setTicketsFound(null);
    }
  };

  const handleRediscover = () => {
    // Rediriger vers l'accueil ou actualiser
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
            <Ticket className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Mes Tickets
          </h1>
          <p className="text-sm text-gray-600">
            Retrouvez tous vos tickets en entrant votre email
          </p>
        </div>

        {/* Formulaire de recherche */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Rechercher mes tickets
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Entrez l'adresse email utilisée lors de l'achat et le code de vérification reçu.
          </p>

          <div className="space-y-4">
            {/* Adresse email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Code de vérification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code de vérification
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Bouton Rechercher */}
            <button
              onClick={handleSearch}
              className="w-full bg-main-gradient btn-gradient text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </button>
          </div>
        </div>

        {/* Résultats */}
        {hasSearched && (
          <>
            {ticketsFound ? (
              /* Tickets trouvés */
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <Ticket className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Ticket trouvé
                  </h2>
                  <p className="text-sm text-gray-600">
                    {ticketsFound.length} tickets enregistrés
                  </p>
                </div>

                {/* Grille de tickets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {ticketsFound.map((ticket, index) => (
                    <TicketCard key={index} ticket={ticket} />
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-main-gradient btn-gradient text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200">
                    Télécharger les QR Codes
                  </button>
                  <button
                    onClick={handleRediscover}
                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
                  >
                    Retour à l'Accueil
                  </button>
                </div>

                {/* Informations importantes */}
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-orange-900 mb-2">
                    Informations importantes
                  </h3>
                  <ul className="text-xs text-orange-800 space-y-1">
                    <li>• Pensez à télécharger vos QR codes avant l'événement</li>
                    <li>• Un QR code par personne est nécessaire pour entrer</li>
                    <li>• Conservez votre code de vérification pour retrouver vos tickets ultérieurement</li>
                  </ul>
                </div>
              </div>
            ) : (
              /* Aucun ticket trouvé */
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Ticket className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Aucun ticket trouvé
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Aucun ticket n'a été trouvé pour l'adresse{' '}
                  <span className="font-medium text-gray-900">
                    votre.email@example.com
                  </span>
                </p>
                <button
                  onClick={handleRediscover}
                  className="bg-main-gradient btn-gradient text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200"
                >
                  Découvrir les évènements
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}