import api from "./api";

export async function upvote(set) {
    const response = await api.post(`/trip/${set}`);
    return response.data;
  }