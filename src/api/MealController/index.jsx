import service from "../index.js";
import { API } from "../../constant/api.js";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../constant/query.js";

const TopFiveReceipts = async () => {
  return await service.get(API.REPORT.GET_TOP_FIVE_RECEIPT);
};

export const useTopFiveReceipts = () => {
  return useQuery({
    queryFn: TopFiveReceipts,
    queryKey: [QUERY_KEYS.REPORT.TOP_FIVE],
  });
};

const ReadyToFoodCounts = async () => {
  return await service.get(API.REPORT.GET_READYFOOD);
};

export const useReadyToFoodCounts = () => {
  return useQuery({
    queryFn: ReadyToFoodCounts,
    queryKey: [QUERY_KEYS.REPORT.FOOD_COUNT],
  });
};

const ReceiptCounting = async () => {
  return await service.get(API.REPORT.GET_RECEIPT);
};

export const useReceiptCounting = () => {
  return useQuery({
    queryFn: ReceiptCounting,
    queryKey: [QUERY_KEYS.REPORT.RECEIPT],
  });
};

const UserReports = async ({ email, dateRange }) => {
  return await service.get(
    API.REPORT.GET_EMAIL_DATE + email + `/${dateRange[0]}/${dateRange[1]}`,
  );
};

export const useUserReports = ({ email, dateRange }) => {
  return useQuery({
    queryFn: async () => {
      return await UserReports({ email, dateRange });
    },
    queryKey: [
      QUERY_KEYS.REPORT.EMAIL_DATE,
      email,
      dateRange ? dateRange[0] : new Date().getTime(),
      dateRange ? dateRange[1] : new Date().getTime(),
    ],
    enabled: false,
  });
};
