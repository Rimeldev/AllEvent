import ky from "ky";

const api = ky.create({
  prefixUrl: "https://ticketing.alwaysdata.net",
  headers: {
    "Content-Type": "application/json"
  },
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});
export default api;
