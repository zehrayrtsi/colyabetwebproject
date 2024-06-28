import service from "../index.js";
import { API, BASE_URL } from "../../constant/api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import MUTATION_KEY from "../../constant/mutation.js";
import QUERY_KEYS from "../../constant/query.js";
import axios from "axios";

const UserLogin = async ({ email, password }) => {
  return await axios.post(BASE_URL + API.USERS.LOGIN, { email, password });
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: UserLogin,
    mutationKey: [MUTATION_KEY.USER.LOGIN],
  });
};

const GetAllUsers = async () => {
  return await service.get(API.USERS.GET_ALL);
};

export const useGetAllUsers = () => {
  return useQuery({
    queryFn: GetAllUsers,
    queryKey: [QUERY_KEYS.USER.GET_ALL],
  });
};

export const RefreshToken = async (refreshToken) => {
  return await axios.post(`${BASE_URL}${API.USERS.REFRESH_TOKEN}`, {
    refreshToken,
  });
};

const RemoveUser = async (email) => {
  return await service.delete(`${BASE_URL}${API.USERS.DELETE}${email}`);
};

export const useRemoveUser = () => {
  return useMutation({
    mutationFn: RemoveUser,
    mutationKey: [MUTATION_KEY.USER.REMOVE],
  });
};
