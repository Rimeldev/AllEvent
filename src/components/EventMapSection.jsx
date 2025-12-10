import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Star, Navigation, ExternalLink } from 'lucide-react';

export default function EventMapSection({ location }) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const locationData = location || {
    name: "Parc Des Expositions D'Abidjan",
    address: "Bd Latrille, Abidjan, Côte d'Ivoire",
    rating: 4.0,
    reviewCount: 117604,
    coordinates: { lat: 5.3364, lng: -4.0267 },
    itinerary: "https://maps.google.com/?q=Parc+Des+Expositions+D'Abidjan"
  };

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
      document.head.removeChild(link);
      document.body.removeChild(script);
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
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #1f2937;">${locationData.rating.toFixed(1)}</span>
            <span style="color: #fbbf24;">★★★★☆</span>
            <span style="font-size: 11px; color: #6b7280;">(${locationData.reviewCount.toLocaleString()})</span>
          </div>
          <a href="${locationData.itinerary}" target="_blank" style="color: #3b82f6; font-size: 12px; text-decoration: none; font-weight: 500;">
            📍 Obtenir l'itinéraire →
          </a>
        </div>
      `);

      // Nettoyer la carte lors du démontage
      return () => {
        map.remove();
      };
    }
  }, [mapLoaded, locationData]);

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

        {/* Carte et informations */}
        <div className=" ">
          <div className="relative">
            {/* Carte Leaflet */}
            <div 
              ref={mapRef} 
              className="w-full max-w-2xl mx-auto h-[400px] sm:h-[400px] z-0 rounded-xl shadow-lg overflow-hidden"
         
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de la carte...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Carte d'information flottante */}
            <div className="absolute top-4 left-80 bg-white rounded-lg shadow-xl p-4 max-w-xs z-10">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {locationData.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {locationData.address}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {locationData.rating.toFixed(1)}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(locationData.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {locationData.reviewCount.toLocaleString()} avis
                    </span>
                  </div>
                </div>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}