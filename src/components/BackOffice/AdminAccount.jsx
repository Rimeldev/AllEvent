import { useEffect, useState } from "react";
import { User, Lock, Trash2, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  deleteAccount,
  uploadAvatar,
  deleteAvatar
} from "../../services/userService";

export default function AdminAccount() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  // 🔹 Charger le profil
  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await getUserProfile();
      setProfile(res.data);
      setForm({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
      });
    } catch {
      toast.error("Impossible de charger le profil");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Update profil
  async function handleProfileUpdate(e) {
    e.preventDefault();
    try {
      await updateUserProfile(form);
      toast.success("Profil mis à jour");
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  }

  // 🔹 Changer mot de passe
  async function handlePasswordUpdate(e) {
    e.preventDefault();

    if (passwords.new_password !== passwords.confirm_password) {
      return toast.error("Les mots de passe ne correspondent pas");
    }

    try {
      await updatePassword({
        old_password: passwords.old_password,
        new_password: passwords.new_password,
      });
      toast.success("Mot de passe modifié");
      setPasswords({ old_password: "", new_password: "", confirm_password: "" });
    } catch {
      toast.error("Erreur lors du changement de mot de passe");
    }
  }

  // 🔹 Avatar
  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await uploadAvatar(formData);
      toast.success("Avatar mis à jour");
      fetchProfile();
    } catch {
      toast.error("Erreur avatar");
    }
  }

  async function handleAvatarDelete() {
    try {
      await deleteAvatar();
      toast.success("Avatar supprimé");
      fetchProfile();
    } catch {
      toast.error("Erreur suppression avatar");
    }
  }

  // 🔥 Suppression compte
  async function handleDeleteAccount() {
    if (!confirm("Cette action est irréversible. Continuer ?")) return;

    try {
      await deleteAccount();
      localStorage.clear();
      window.location.href = "/";
    } catch {
      toast.error("Impossible de supprimer le compte");
    }
  }

  if (loading) {
    return <p className="text-center min-h-screen py-20 text-gray-500">Chargement...</p>;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-16 py-10 max-w-5xl mx-auto space-y-10">

      {/* 🧑 Profil */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-6">
          <User className="text-orange-600" /> Informations personnelles
        </h2>

        <form onSubmit={handleProfileUpdate} className="grid gap-4 sm:grid-cols-2">
          <input
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            placeholder="Prénom"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            placeholder="Nom"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            value={form.email}
            disabled
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 cursor-not-allowed"
          />

          <button className="w-full py-3 text-white font-semibold rounded-lg bg-main-gradient btn-gradient sm:col-span-2">
            Mettre à jour
          </button>
        </form>
      </div>

      {/* 🔐 Mot de passe */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-6">
          <Lock className="text-blue-600" /> Sécurité
        </h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="Ancien mot de passe"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={passwords.old_password}
            onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={passwords.new_password}
            onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            value={passwords.confirm_password}
            onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
          />

          <button className="w-full py-3 text-white font-semibold rounded-lg bg-main-gradient btn-gradient">
            Changer le mot de passe
          </button>
        </form>
      </div>

      {/* 🗑 Suppression */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-red-700 mb-4">
          <Trash2 /> Supprimer le compte
        </h2>

        <p className="text-sm text-red-600 mb-4">
          Cette action est définitive et irréversible.
        </p>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Supprimer mon compte
        </button>
      </div>
    </section>
  );
}
