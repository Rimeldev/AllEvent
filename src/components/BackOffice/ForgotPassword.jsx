import React, { useState } from "react";
import EventTitle from "../EventTitle.jsx";
import { forgotPasswordRequest } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Veuillez entrer un email !");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPasswordRequest(email);

      toast.success(res.message || "Code envoyé !");

      // redirection vers page OTP reset
      navigate("/set-password", {
        state: { email },
      });

    } catch (error) {
      toast.error(error.response?.message || "Entrez un email valide !");
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <EventTitle />
        </div>

        {/* Titre */}
        <h1 className="text-xl font-semibold text-black mb-10">
          Mot de passe oublié
        </h1>

        <p className="text-xs text-black mb-10">
          Entrez votre mail, un code d’identification unique sera envoyé .
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              bg-gray-100 focus:ring-2 focus:ring-orange-500 text-sm outline-none"
          />
          {/* Bouton */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold rounded-lg 
            bg-main-gradient btn-gradient"
            disabled={loading}
          >
            {loading ? "Envoie..." : "Envoyer"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-10">
          © 2025 AIEvents. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
