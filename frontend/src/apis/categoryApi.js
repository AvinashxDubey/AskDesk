import api from "./index";

export const getCategories = () => api.get("/category/");
export const createCategory = (data) => api.post("/category/", data);
export const updateCategory = (id, data) => api.patch(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);