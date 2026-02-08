import React, { useState, useRef } from "react";
import { Ticket } from "lucide-react";
import logo from "../assets/logo/logo.png";
import { useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
 

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        
        {/* Logo */}
     <div className="flex items-center gap-2 sm:gap-3 cursor-pointer"
     onClick={() => navigate("/dashboard")}>
             <img
                src={logo} 
               alt="Logo EPAC"
               className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
             />
             <h1 className="font-display text-white font-medium text-lg sm:text-xl md:text-2xl tracking-wider uppercase">
               EPAC Events
             </h1>
           </div>
        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {/* Bouton Tickets (public seulement) */}
   
            <button
              onClick={() => navigate("/qr-scanner")}
              className="flex items-center gap-2 bg-[#E95503] text-white px-4 py-2 rounded-xl hover:scale-105 transition"
            >
              <Ticket size={18} />
              <span className="hidden sm:inline">Éliminer un ticket</span>
              <span className="sm:hidden">Éliminer <br /> un ticket</span>
            </button>

          {/* Menu Admin */}
            <div className="relative" ref={menuRef}>
              <img
                src="https://ui-avatars.com/api/?name=Admin"
                alt="Profil"
                className="h-9 w-9 rounded-full cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow border z-50">
                  <button
                    onClick={() => navigate("/admin/account")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Mon compte
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/admin/login");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </header>
  );
}
