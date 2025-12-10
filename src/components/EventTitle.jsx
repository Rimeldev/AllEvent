import React from 'react'

export default function EventTitle() {
  return (
  <div className="flex items-center gap-2 mx-auto">
          <img 
            src="/src/assets/logo/logo.png" 
            alt="INSTI Events Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className=" font-display text-xl">INSTI</span>
        </div>
  )
}
