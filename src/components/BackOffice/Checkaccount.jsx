import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import EventTitle from '../EventTitle.jsx';
import { activateAccount } from "../../services/authService";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function AccountVerification() {

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // On récupère l'email depuis la page Login via navigate()
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      toast.error("Veuillez entrer le code reçu !");
      return;
    }

    try {
      const res = await activateAccount(email, otp);

      const token = res.data?.access_token;

      if (token) {
        localStorage.setItem("token", token);

        toast.success("Compte vérifié avec succès 🎉");

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.message || "Code incorrect !");
    }
    finally {
      setLoading(false);
    }
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
          Protégez votre compte
        </h1>

        <p  className="text-xs text-black mb-10">Vous êtes connecté(e) en tant que [email]. Pour plus de sécurité, veuillez vérifier votre identité. Nous avons envoyé un code de vérification.</p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          {/* texte */}
          <input
            type="text"
            placeholder="Le code de vérification"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              bg-gray-100 focus:ring-2 focus:ring-orange-500 text-sm outline-none"
          />

<a href="#" className="text-blue-600 text-end hover:underline">
             Renvoyer le code
            </a>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold rounded-lg 
            bg-main-gradient btn-gradient"
            disabled={loading}
          >
           { loading ? "Vérification..." : "Vérifier le code"}
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
