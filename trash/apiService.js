import apiClient from "../frontend/src/api/apiClient";

export const fetchEndpoint1 = () => {
  return apiClient.get("/api/endpoint1");
};

export const postEndpoint2 = (data) => {
  return apiClient.post("/endpoint2", data);
};