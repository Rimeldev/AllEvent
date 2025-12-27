import ky from "ky";

const api = ky.create({
  prefixUrl: "https://ticketing.alwaysdata.net",
  // ❌ NE PAS mettre Content-Type ici globalement
  // Ky le gère automatiquement selon le type de body
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
        
        // 🔥 Ne mettre Content-Type: application/json QUE si ce n'est pas du FormData
        const body = request.body;
        const isFormData = body instanceof FormData;
        
        if (!isFormData && !request.headers.has("Content-Type")) {
          request.headers.set("Content-Type", "application/json");
        }
      }
    ]
  }
});

export default api;