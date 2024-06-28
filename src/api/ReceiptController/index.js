import service from "../index.js";
import { API } from "../../constant/api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../constant/query.js";
import MUTATION_KEY from "../../constant/mutation.js";

const GetAllReceipts = async () => {
  return await service.get(API.RECEIPTS.GET_ALL);
};

export const useGetAllReceipts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECEIPTS.GET_ALL],
    queryFn: async () => {
      return await GetAllReceipts();
    },
  });
};

export const GetReceiptById = async (id) => {
  return await service.get(API.RECEIPTS.GET_BY_ID + id);
};

const GetAllTypes = async () => {
  return await service.get(API.RECEIPTS.GET_TYPES);
};

export const useGetAllTypes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TYPES.GET_ALL],
    queryFn: async () => {
      return await GetAllTypes();
    },
  });
};

const AddNewReceipt = async (newReceipt) => {
  return await service.post(API.RECEIPTS.POST, newReceipt);
};

export const useAddNewReceipt = () => {
  return useMutation({
    mutationFn: AddNewReceipt,
    mutationKey: [MUTATION_KEY.RECEIPTS.ADD],
  });
};

const UpdateReceipt = async (receipt) => {
  return await service.put(API.RECEIPTS.PUT + receipt.id, receipt);
};

export const useUpdateReceipt = () => {
  return useMutation({
    mutationFn: UpdateReceipt,
    mutationKey: MUTATION_KEY.RECEIPTS.UPDATE,
  });
};

export const DeleteReceipt = async (receiptId) => {
  return await service.delete(API.RECEIPTS.DELETE + receiptId);
};

export const useDeleteReceipt = () => {
  return useMutation({
    mutationFn: DeleteReceipt,
    mutationKey: [MUTATION_KEY.RECEIPTS.REMOVE],
  });
};
