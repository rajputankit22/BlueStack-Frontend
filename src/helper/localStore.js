// Get jwt token from local memory.
export const authenticate = () => {
  return localStorage.getItem("authToken");
};

export const refreshtoken = () => {
  var admin = JSON.parse(localStorage.getItem("User_data"));
  return admin.refreshToken;
};

// Jwt token store in local memory
export const storeToken = refreshTokentoken => {
  localStorage.setItem("authToken", refreshTokentoken);
};
