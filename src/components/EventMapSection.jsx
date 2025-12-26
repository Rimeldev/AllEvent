import { useEffect, useRef, useState } from 'react';

export default function EventMapSection({ event }) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Utiliser les données de l'événement ou valeurs par défaut
  const locationData = {
    name: event?.address || event?.city || "Lieu de l'événement",
    address: event?.address || event?.city || "Adresse non spécifiée",
    city: event?.city || "",
    coordinates: {
      lat: event?.latitude || 6.3703, // Cotonou par défaut
      lng: event?.longitude || 2.3912
    }
  };

  // Créer l'URL Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationData.coordinates.lat},${locationData.coordinates.lng}`;

  useEffect(() => {
    // Charger Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Charger Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    
    script.onload = () => {
      setMapLoaded(true);
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.L) {
      // Initialiser la carte
      const map = window.L.map(mapRef.current).setView(
        [locationData.coordinates.lat, locationData.coordinates.lng],
        15
      );

      // Ajouter la couche de tuiles OpenStreetMap
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Créer une icône personnalisée
      const customIcon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="position: relative;">
            <div style="
              background: white;
              padding: 8px 12px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              font-weight: 600;
              font-size: 12px;
              white-space: nowrap;
              margin-bottom: 8px;
              color: #1f2937;
            ">
              ${locationData.name}
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid white;
              margin: 0 auto;
              margin-bottom: 4px;
            "></div>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#ef4444" stroke="white" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="white"></circle>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 70],
        popupAnchor: [0, -70]
      });

      // Ajouter le marqueur
      const marker = window.L.marker(
        [locationData.coordinates.lat, locationData.coordinates.lng],
        { icon: customIcon }
      ).addTo(map);

      // Ajouter un popup
      marker.bindPopup(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">${locationData.name}</h3>
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">${locationData.address}</p>
          ${locationData.city ? `<p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">📍 ${locationData.city}</p>` : ''}
          <a href="${googleMapsUrl}" target="_blank" style="color: #3b82f6; font-size: 12px; text-decoration: none; font-weight: 500;">
            🗺️ Obtenir l'itinéraire →
          </a>
        </div>
      `);

      // Nettoyer la carte lors du démontage
      return () => {
        map.remove();
      };
    }
  }, [mapLoaded, locationData.coordinates.lat, locationData.coordinates.lng, locationData.name, locationData.address, locationData.city, googleMapsUrl]);

  // Si pas de coordonnées, ne pas afficher la section
  if (!event?.latitude || !event?.longitude) {
    return (
      <section className="py-8 sm:py-12 md:py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block">
              <div className="h-1 w-56 bg-main-gradient rounded-full mb-4"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Voir le lieu sur la carte
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500">Les coordonnées du lieu ne sont pas disponibles</p>
            {locationData.address && (
              <p className="text-gray-700 mt-2 font-semibold">{locationData.address}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="h-1 w-56 bg-main-gradient rounded-full mb-4"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Voir le lieu sur la carte
          </h2>
        </div>

        {/* Informations de localisation */}
        <div className="max-w-2xl mx-auto mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">{locationData.name}</h3>
              {locationData.city && (
                <p className="text-sm text-gray-600">{locationData.city}</p>
              )}
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
              >
                🗺️ Obtenir l'itinéraire
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Carte et informations */}
        <div className="relative">
          {/* Carte Leaflet */}
          <div 
            ref={mapRef} 
            className="w-full max-w-2xl mx-auto h-[400px] sm:h-[400px] z-0 rounded-xl shadow-lg overflow-hidden"
          >
            {!mapLoaded && (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement de la carte...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}