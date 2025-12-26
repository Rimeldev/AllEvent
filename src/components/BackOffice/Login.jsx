import  { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import EventTitle from '../EventTitle.jsx';
import { loginRequest } from "../../services/authService";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const res = await loginRequest(email, password);

      // => si l'API retourne access_token
      if (res?.access_token) {

        localStorage.setItem("token", res.access_token);

        toast.success("Connexion réussie !");
        
        navigate("/dashboard");

        return; // IMPORTANT
      }

      // => pas de token = première connexion = étape suivante
      toast("Bienvenue ! Veuillez compléter votre première connexion");

     sessionStorage.setItem("auth_email", email);

navigate("/Checkaccount", {
  state: { email }
});

    } catch (err) {

      toast.error("Identifiants incorrects");
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
          Connectez-vous à Epac Events
        </h1>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
             value={email}
        onChange={e => setEmail(e.target.value)}
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

          {/* Options */}
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-orange-500" />
              <span className="text-gray-700">Se souvenir de moi</span>
            </label>

            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Mot de passe oublié
            </Link  >
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold rounded-lg 
            bg-main-gradient btn-gradient"
            disabled={loading}
          >
           { loading ? "Connexion..." : "Se connecter"}
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
