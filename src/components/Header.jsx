import React from "react";
import { Ticket } from "lucide-react";
import logo from "../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";


export default function Header() {
 const navigate = useNavigate();


  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        
        {/* Logo + Titre */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer"
        onClick={() => navigate("/")}>
          <img
             src={logo} 
            alt="Logo EPAC"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          />
          <h1 className="font-display text-white font-medium text-lg sm:text-xl md:text-2xl tracking-wider uppercase">
            EPAC Events
          </h1>
        </div>

        {/* CTA */}
        <button
          className="flex items-center gap-1.5 sm:gap-2 bg-[#E95503] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-primary font-medium hover:scale-105 transition-all text-sm sm:text-base"
        >
          <Ticket size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span onClick={() => navigate("/tickets")} className="hidden xs:inline sm:inline">Mes Tickets</span>
          <span onClick={() => navigate("/tickets")} className="inline xs:hidden sm:hidden">Tickets</span>
        </button>
      </div>
    </header>
  );
}