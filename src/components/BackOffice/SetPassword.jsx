import  { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import EventTitle from '../EventTitle.jsx';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../services/authService";
import { useLocation } from "react-router-dom";

export default function SetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Veuillez entrer le code !");
      return;
    }

    if (!password.trim()) {
      toast.error("Veuillez entrer un mot de passe !");
      return;
    }

    if (password !== newPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    if (!email) {
      toast.error("Erreur email, recommencez le processus !");
      return;
    }

    setLoading(true);

   try {
  const res = await resetPasswordRequest (
    email,
    Number(otp),
    password,
    newPassword
  );

  toast.success("Mot de passe réinitialisé avec succès !");
  navigate("/login");

} catch (error) {
  toast.error(error?.response?.message ?? "Une erreur s'est produite");
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
          Réinitialiser le mot de passe
        </h1>
         <p className="text-xs text-black mb-10">
         Entrez le code de vérification envoyé à votre email et définissez un nouveau mot de passe.
        </p>

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

          {/* Mot de passe */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
               value={password}
        onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                bg-gray-100 focus:ring-2 focus:ring-orange-500 text-sm outline-none"
         />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirmer Mot de passe */}
          <div className="relative">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
               value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                bg-gray-100 focus:ring-2 focus:ring-orange-500 text-sm outline-none"
         />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
            >
              {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>


          {/* Bouton */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold rounded-lg 
            bg-main-gradient btn-gradient"
            disabled={loading}
          >
           { loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
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
