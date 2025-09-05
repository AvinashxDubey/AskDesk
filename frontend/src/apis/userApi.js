import api from "./index";

// admin only
export const getAllUsers = () => api.get("/user/users");
export const changeUserRole = (id, data) => api.patch(`/user/${id}`, data);