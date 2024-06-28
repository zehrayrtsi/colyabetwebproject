import service from "../index.js";
import { API } from "../../constant/api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../constant/query.js";
import MUTATION_KEY from "../../constant/mutation.js";

const GetAllBarcodes = async () => {
  return await service.get(API.BARCODES.GET_ALL);
};

export const useGetAllBarcodes = () => {
  return useQuery({
    queryFn: GetAllBarcodes,
    queryKey: [QUERY_KEYS.BARCODES.GET_ALL],
  });
};

export const GetBarcodeById = async (id) => {
  return await service.get(API.BARCODES.GET_BY_ID + id);
};

const AddNewBarcode = async (barcode) => {
  return await service.post(API.BARCODES.POST, barcode);
};

export const useAddNewBarcode = () => {
  return useMutation({
    mutationFn: AddNewBarcode,
    mutationKey: [MUTATION_KEY.BARCODES.ADD],
  });
};

const UpdateBarcode = async (barcode) => {
  return await service.put(API.BARCODES.PUT + barcode.id, barcode);
};

export const useUpdateBarcode = () => {
  return useMutation({
    mutationFn: UpdateBarcode,
    mutationKey: [MUTATION_KEY.BARCODES.UPDATE],
  });
};

const DeleteBarcode = async (barcodeId) => {
  return await service.delete(`${API.BARCODES.DELETE}${barcodeId}`);
};

export const useDeleteBarcode = () => {
  return useMutation({
    mutationFn: DeleteBarcode,
    mutationKey: [MUTATION_KEY.BARCODES.REMOVE],
  });
};
