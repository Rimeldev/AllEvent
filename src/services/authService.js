import api  from "./api";



export const loginRequest = async (credential, password) => {
  return await api.post("api/auth/signin", {
    json: { credential, password },
  }).json();
  
};


export const activateAccount = async (email, otp) => {
  return await api.post("api/auth/account/activate", {
    json: { email, otp_code: Number(otp) },
  }).json();
};

export const forgotPasswordRequest = async (email) => {
  return await api.post("api/auth/password/forgot", {
    json: { email },
  }).json();
};

export const resetPasswordRequest = async (email, otp_code, new_password, confirm_new_password) => {
  return await api.post("api/auth/password/reset", {
    json: {
      email,
      otp_code,
      new_password,
      confirm_new_password,
    },
  }).json();
};
