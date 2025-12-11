import React from 'react'
import logo from "../assets/logo/logo.png";

export default function EventTitle() {
  return (
  <div className="flex items-center gap-2 mx-auto">
          <img 
            src={logo} 
            alt="EPAC Events Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className=" font-display text-xl">EPAC</span>
        </div>
  )
}
