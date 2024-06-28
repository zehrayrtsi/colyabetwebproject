import service from "../index.js";
import { API } from "../../constant/api.js";

export const GetAllComments = async (id) => {
  return await service.get(API.COMMENTS.WITH_REPLIES + id);
};
