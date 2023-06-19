import apiClient from "@/api/apiClient";

export const getNovels = () => apiClient.get("/novels");
export const getNovel = (id) => apiClient.get(`/novel/${id}`);
export const deleteNovels = (ids) => apiClient.delete("/novels", { data: ids });
