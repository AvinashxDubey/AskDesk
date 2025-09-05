import api from "./index";

export const signInUser = (userData) => api.post('/auth/login', userData);
export const signUpUser = (userData) => api.post('/auth/register', userData);
export const getUserProfile = () => api.get('/auth/profile');