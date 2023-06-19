import apiClient from "@/api/apiClient";

export const getChapter = (id) => apiClient.get(`/chapter/${id}`);
