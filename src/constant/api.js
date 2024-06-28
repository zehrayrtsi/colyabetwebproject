export const BASE_URL = "https://api.colyakdiyabet.com.tr/api";

export const TOKEN_EXPIRE_TIME = 1000 * 5;

export const API = {
  RECEIPTS: {
    PUT: "/receipts/update/",
    POST: "/receipts/create",
    GET_ALL: "/receipts/getAll/all",
    GET_BY_ID: "/receipts/getbyId/",
    DELETE: "/receipts/delete/",
    GET_TYPES: "/receipts/types",
  },
  READY_FOODS: {
    PUT: "/ready-foods/put/",
    POST: "/ready-foods/create",
    GET_ALL: "/ready-foods/getall",
    GET_BY_ID: "/ready-foods/",
    DELETE: "/ready-foods/delete/",
  },
  QUIZ: {
    PUT: "/quiz/put/",
    POST: "/quiz/add",
    GET_ALL: "/quiz/all",
    GET_BY_ID: "/quiz/byId/",
    DELETE: "/quiz/delete/",
  },
  IMAGES: {
    DELETE: "/image/delete/",
    PUT: "/image/updateImage/",
    POST: "/image/addImage",
    GET_BY_ID: "/image/",
    GET_ALL_PDF: "/image/get/pdfListData2",
    GET: "/image/get/",
  },
  COMMENTS: {
    GET_BY_RECEIPT_ID: "/comments/receipt/",
    DELETE: "/comments/",
    WITH_REPLIES: "/replies/receipt/commentsWithReplyByReceiptId/",
  },
  REPLIES: {
    GET_BY_COMMENT_ID: "/replies/comments/",
    DELETE: "/replies/",
  },
  USERS: {
    GET_ALL: "/users/verify/ListAll",
    LOGIN: "/users/verify/login",
    REFRESH_TOKEN: "/users/verify/refresh-token",
    DELETE: "/users/verify/deleteUser/",
    ADD_ADMIN: "/users/verify/adminRole/",
    REMOVE_ADMIN: "/users/verify/removeAdmin/",
  },
  SUGGESTIONS: {
    GET_ALL: "/suggestions/getAll",
    DELETE: "/suggestions/delete/",
  },
  BARCODES: {
    POST: "/barcodes/add",
    PUT: "/barcodes/put/byId/",
    DELETE: "/barcodes/delete/byId/",
    GET_ALL: "/barcodes/all",
    GET_BY_ID: "/barcodes/get/byId/",
  },
  REPORT: {
    GET_EMAIL_DATE: "/meals/report/",
    GET_READYFOOD: "/meals/report/ready-food-counts",
    GET_RECEIPT: "/meals/receipt-counting",
    GET_TOP_FIVE_RECEIPT: "/meals/report/top5receipts",
  },
};
