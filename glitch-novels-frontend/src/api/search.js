import apiClient from "@/api/apiClient";

export const search = (keyword) => apiClient.get("/search", { params: { keyword } });
