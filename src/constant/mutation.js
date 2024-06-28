const MUTATION_KEY = {
  RECEIPTS: {
    ADD: "receipt-add-mutation",
    REMOVE: "receipt-remove-mutation",
    UPDATE: "receipt-update-mutation",
  },
  QUIZ: {
    ADD: "quiz-add-mutation",
    UPDATE: "quiz-update-mutation",
    REMOVE: "quiz-remove-mutation",
  },
  USER: {
    LOGIN: "login-mutation",
    REMOVE: "user-remove-mutation",
  },
  SUGGESTIONS: {
    REMOVE: "suggestions-remove-mutation",
  },
  BARCODES: {
    ADD: "barcode-add-mutation",
    UPDATE: "barcode-update-mutation",
    REMOVE: "barcode-remove-mutation",
  },
  IMAGE: {
    REMOVE: "image-remove-mutation",
  },
};

export default MUTATION_KEY;
