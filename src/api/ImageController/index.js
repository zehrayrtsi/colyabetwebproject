import service from "../index.js";
import { API } from "../../constant/api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../constant/query.js";
import MUTATION_KEY from "../../constant/mutation.js";

const GetAllPDF = async () => {
  return await service.get(API.IMAGES.GET_ALL_PDF);
};

export const useGetAllPDF = () => {
  return useQuery({
    queryFn: GetAllPDF,
    queryKey: [QUERY_KEYS.IMAGE.GET_ALL_PDF],
  });
};

const DeleteImage = async (id) => {
  return await service.delete(API.IMAGES.DELETE + id);
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: DeleteImage,
    mutationKey: MUTATION_KEY.IMAGE.REMOVE,
  });
};
