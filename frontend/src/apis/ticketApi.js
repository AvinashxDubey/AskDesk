import api from "./index";

export const createTicket = (data) => api.post("/ticket/", data);
export const getTickets = () => api.get("/ticket/");
export const getTicketById = (id) => api.get(`/ticket/${id}`);
export const updateTicket = (id, data) => api.patch(`/ticket/${id}`, data);
export const addReply = (id, data) => api.patch(`/ticket/reply/${id}`, data);
export const toggleUpvote = (id) => api.patch(`/ticket/upvote/${id}`);
export const toggleDownvote = (id) => api.patch(`/ticket/downvote/${id}`);