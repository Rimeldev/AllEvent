import React, { useState } from 'react';
import { Ticket, Mail, Search, KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ticketService } from '../services/ticketServiceUser';

// Composant pour un ticket avec QR code
const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* QR Code - à générer selon vos données */}
      <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center">
        <div className="text-xs text-gray-500">QR Code</div>
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
  const [step, setStep] = useState(1); // 1: email, 2: code
  const [tickets, setTickets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Étape 1 : Envoyer l'email pour recevoir le code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Veuillez entrer votre adresse email');
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return;
    }

    setIsLoading(true);
    
    try {
      await ticketService.requestVerificationCode(email);
      toast.success('Code de vérification envoyé par email !');
      setStep(2); // Passer à l'étape de saisie du code
    } catch (error) {
      console.error('Erreur lors de l\'envoi du code:', error);
      
      if (error.response) {
        const errorData = await error.response.json().catch(() => ({}));
        toast.error(errorData.message || 'Erreur lors de l\'envoi du code');
      } else {
        toast.error('Erreur de connexion. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Étape 2 : Récupérer les tickets avec le code
  const handleGetTickets = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      toast.error('Veuillez entrer le code de vérification');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await ticketService.getAllTickets(email, verificationCode);
      
      if (response && response.tickets && response.tickets.length > 0) {
        setTickets(response.tickets);
        toast.success(`${response.tickets.length} ticket(s) trouvé(s) !`);
      } else {
        setTickets([]);
        toast.info('Aucun ticket trouvé pour cet email');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
      
      if (error.response) {
        const errorData = await error.response.json().catch(() => ({}));
        
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error('Code de vérification invalide');
        } else {
          toast.error(errorData.message || 'Erreur lors de la récupération des tickets');
        }
      } else {
        toast.error('Erreur de connexion. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setVerificationCode('');
    setStep(1);
    setTickets(null);
  };

  const handleRediscover = () => {
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
        {tickets === null && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              {step === 1 ? 'Rechercher mes tickets' : 'Entrer le code de vérification'}
            </h2>
            
            {step === 1 ? (
              <form onSubmit={handleRequestCode}>
                <p className="text-xs text-gray-500 mb-4">
                  Entrez l'adresse email utilisée lors de l'achat. Nous vous enverrons un code de vérification.
                </p>

                <div className="space-y-4">
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
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-main-gradient btn-gradient text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Recevoir le code
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleGetTickets}>
                <p className="text-xs text-gray-500 mb-4">
                  Un code de vérification a été envoyé à{' '}
                  <span className="font-medium text-gray-900">{email}</span>.
                  Vérifiez votre boîte de réception.
                </p>

                <div className="space-y-4">
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
                        placeholder="Entrez le code reçu"
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-main-gradient btn-gradient text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Rechercher
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isLoading}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                  >
                    ← Changer d'adresse email
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Résultats */}
        {tickets !== null && (
          <>
            {tickets.length > 0 ? (
              /* Tickets trouvés */
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <Ticket className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Tickets trouvés
                  </h2>
                  <p className="text-sm text-gray-600">
                    {tickets.length} ticket{tickets.length > 1 ? 's' : ''} enregistré{tickets.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Grille de tickets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {tickets.map((ticket, index) => (
                    <TicketCard key={ticket.id || index} ticket={ticket} />
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

                <button
                  onClick={handleReset}
                  className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Rechercher d'autres tickets
                </button>
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
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-lg transition-all duration-200"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={handleRediscover}
                    className="bg-main-gradient btn-gradient text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200"
                  >
                    Découvrir les événements
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}