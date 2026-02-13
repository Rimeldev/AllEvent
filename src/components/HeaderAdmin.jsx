import React, { useState, useRef, useEffect } from "react";
import { Ticket, Shield, UserCircle, User } from "lucide-react";
import logo from "../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";

export default function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await getUserProfile();
      setProfile(res.data || res);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    }
  }

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
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
          
          {/* Bouton Scanner */}
          <button
            onClick={() => navigate("/qr-scanner")}
            className="flex items-center gap-2 bg-[#E95503] text-white px-4 py-2 rounded-xl hover:scale-105 transition"
          >
            <Ticket size={18} />
            <span className="hidden sm:inline">Scanner un ticket</span>
            <span className="sm:hidden text-xs">Scanner</span>
          </button>

          {/* Menu Admin */}
          <div className="relative" ref={menuRef}>
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${
                profile?.is_superuser 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                  : profile?.is_admin
                  ? 'bg-gradient-to-br from-orange-500 to-red-600'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-600'
              } shadow-lg hover:scale-105 transition`}
              onClick={() => setShowMenu(!showMenu)}
            >
              {profile?.is_superuser ? (
                <Shield className="w-5 h-5 text-white" />
              ) : profile?.is_admin ? (
                <UserCircle className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 py-1">
                
                {/* Nom de l'utilisateur */}
                {profile && (
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-gray-900">
                      {profile.firstname} {profile.lastname}
                    </p>
                    <p className="text-xs text-gray-500">@{profile.username}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    navigate("/admin/account");
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Mon compte
                </button>

                {/* Menu Utilisateurs (SuperAdmin uniquement) */}
                {profile?.is_superuser && (
                  <button
                    onClick={() => {
                      navigate("/admin/users");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    Utilisateurs
                  </button>
                )}

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 transition border-t"
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