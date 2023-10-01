import apiClient from "@/api/apiClient";

export const search = (keyword) => apiClient.get("/search", { params: { keyword } });
export const getSearchFilters = () => apiClient.get("/advanced_search/filters");
