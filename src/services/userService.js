import api from "./api";

export const getUserProfile = () => api.get("api/user/profile").json();
export const updateUserProfile = (data) => api.put("api/user/profile/update", { json: data }).json();
export const updatePassword = (data) => api.put("api/user/password/update", { json: data }).json();
export const deleteAccount = () => api.delete("api/user/account/delete").json();
export const uploadAvatar = (formData) =>
  api.post("api/user/avatar/define", { body: formData }).json();
export const deleteAvatar = () =>
  api.delete("api/user/avatar/delete").json();
