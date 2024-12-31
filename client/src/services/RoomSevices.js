import { httpClient } from "../config/AxiosHelper";

export const createRoomApi = async (roomDetail) => {
  const response = await httpClient.post(`/api/v1/rooms`, roomDetail, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

export const joinChatApi = async(roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}`);
  return response.data;
}