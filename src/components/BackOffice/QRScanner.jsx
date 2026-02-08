import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Ticket, CheckCircle, XCircle, Loader2, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../../services/ticketServiceUser';

export default function QRScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    startScanner();

    // Cleanup
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      setScanner(html5QrCode);

      // Obtenir les caméras disponibles
      const cameras = await Html5Qrcode.getCameras();
      
      if (cameras && cameras.length > 0) {
        // Préférer la caméra arrière (environment) si disponible
        const backCamera = cameras.find(camera => 
          camera.label.toLowerCase().includes('back') || 
          camera.label.toLowerCase().includes('rear') ||
          camera.label.toLowerCase().includes('environment')
        );
        
        const cameraId = backCamera ? backCamera.id : cameras[0].id;

        // Démarrer le scanner avec la caméra
        await html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          onScanSuccess,
          onScanError
        );

        setIsScanning(true);
        setCameraError(null);
      } else {
        setCameraError("Aucune caméra détectée sur cet appareil");
        toast.error("Aucune caméra disponible");
      }
    } catch (error) {
      console.error("Erreur lors du démarrage du scanner:", error);
      setCameraError("Impossible d'accéder à la caméra. Vérifiez les permissions.");
      toast.error("Erreur d'accès à la caméra");
    }
  };

  const stopScanner = async () => {
    if (scanner && isScanning) {
      try {
        await scanner.stop();
        setIsScanning(false);
      } catch (error) {
        console.error("Erreur lors de l'arrêt du scanner:", error);
      }
    }
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    console.log("QR Code scanné:", decodedText);
    
    // Arrêter le scanner temporairement
    await stopScanner();

    // Vérifier le ticket
    await verifyTicket(decodedText);
  };

  const onScanError = (error) => {
    // Ne rien afficher pour les erreurs normales de scan
    // console.warn("Erreur de scan (normal):", error);
  };

  const verifyTicket = async (qrId) => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const response = await ticketService.verifyTicket(qrId);
      
      setVerificationResult({
        success: true,
        data: response,
        qrId: qrId
      });

      toast.success('Ticket valide !');
      
      // Jouer un son de succès (optionnel)
      playSuccessSound();

    } catch (error) {
      console.error('Erreur de vérification:', error);
      
      let errorMessage = 'Ticket invalide';
      
      if (error.response) {
        const errorData = await error.response.json().catch(() => ({}));
        
        if (error.response.status === 404) {
          errorMessage = 'Ticket introuvable';
        } else if (error.response.status === 410) {
          errorMessage = 'Ticket déjà utilisé';
        } else if (error.response.status === 403) {
          errorMessage = 'Ticket expiré';
        } else {
          errorMessage = errorData.message || 'Ticket invalide';
        }
      }

      setVerificationResult({
        success: false,
        error: errorMessage,
        qrId: qrId
      });

      toast.error(errorMessage);
      
      // Jouer un son d'erreur (optionnel)
      playErrorSound();
    } finally {
      setIsVerifying(false);
    }
  };

  const playSuccessSound = () => {
    const audio = new Audio('/sounds/success.mp3');
    audio.play().catch(e => console.log('Impossible de jouer le son'));
  };

  const playErrorSound = () => {
    const audio = new Audio('/sounds/error.mp3');
    audio.play().catch(e => console.log('Impossible de jouer le son'));
  };

  const resetScanner = async () => {
    setVerificationResult(null);
    await startScanner();
  };

  const handleBack = async () => {
    await stopScanner();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
            <Camera className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Scanner un ticket
          </h1>
          <p className="text-sm text-gray-600">
            Scannez le QR code du ticket pour vérifier sa validité
          </p>
        </div>

        {/* Zone de scan ou résultat */}
        {!verificationResult ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Erreur caméra */}
            {cameraError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">{cameraError}</p>
              </div>
            )}

            {/* Scanner QR Code */}
            <div id="qr-reader" className="w-full rounded-lg overflow-hidden"></div>

            {isVerifying && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <p className="text-gray-600">Vérification en cours...</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={handleBack}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Retour au tableau de bord
              </button>
            </div>
          </div>
        ) : (
          /* Résultat de la vérification */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {verificationResult.success ? (
              /* Ticket valide */
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ticket Valide ✓
                </h2>
                <p className="text-gray-600 mb-6">
                  Ce ticket est authentique et peut être utilisé
                </p>

                {/* Détails du ticket */}
                {verificationResult.data && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Informations du ticket
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-medium text-gray-900">
                          {verificationResult.data.id || verificationResult.qrId}
                        </span>
                      </div>
                      {verificationResult.data.email && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium text-gray-900">
                            {verificationResult.data.email}
                          </span>
                        </div>
                      )}
                      {verificationResult.data.passType && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium text-gray-900">
                            {verificationResult.data.passType}
                          </span>
                        </div>
                      )}
                      {verificationResult.data.purchaseDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date d'achat:</span>
                          <span className="font-medium text-gray-900">
                            {verificationResult.data.purchaseDate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetScanner}
                    className="flex-1 bg-main-gradient btn-gradient text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Scanner un autre ticket
                  </button>
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Retour au tableau de bord
                  </button>
                </div>
              </div>
            ) : (
              /* Ticket invalide */
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ticket Invalide ✗
                </h2>
                <p className="text-red-600 mb-6 font-medium">
                  {verificationResult.error}
                </p>

                {/* ID du QR code scanné */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">QR Code scanné:</p>
                  <p className="font-mono text-sm text-gray-900 break-all">
                    {verificationResult.qrId}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetScanner}
                    className="flex-1 bg-main-gradient btn-gradient text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Réessayer
                  </button>
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Retour au tableau de bord
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Instructions
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Placez le QR code du ticket face à la caméra</li>
            <li>• Assurez-vous d'avoir un bon éclairage</li>
            <li>• Le scan se fera automatiquement</li>
            <li>• Autorisez l'accès à la caméra si demandé</li>
          </ul>
        </div>
      </div>
    </div>
  );
}