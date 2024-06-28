import service from "../index.js";
import { API, BASE_URL } from "../../constant/api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../constant/query.js";
import axios from "axios";
import MUTATION_KEY from "../../constant/mutation.js";

const GetAllSuggestions = async () => {
  return await service.get(API.SUGGESTIONS.GET_ALL);
};

export const useGetAllSuggestions = () => {
  return useQuery({
    queryFn: GetAllSuggestions,
    queryKey: [QUERY_KEYS.SUGGESTIONS.GET_ALL],
  });
};

const RemoveSuggestion = async (id) => {
  return await service.delete(`${BASE_URL}${API.SUGGESTIONS.DELETE}${id}`);
};

export const useRemoveSuggestion = () => {
  return useMutation({
    mutationFn: RemoveSuggestion,
    mutationKey: [MUTATION_KEY.USER.REMOVE],
  });
};
