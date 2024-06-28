import service from "../index.js";
import { API } from "../../constant/api.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../constant/query.js";
import MUTATION_KEY from "../../constant/mutation.js";

const GetAllQuiz = async () => {
  return await service.get(API.QUIZ.GET_ALL);
};

export const useGetAllQuiz = () => {
  return useQuery({
    queryFn: GetAllQuiz,
    queryKey: [QUERY_KEYS.QUIZ.GET_ALL],
  });
};

export const GetQuizById = async (id) => {
  return await service.get(API.QUIZ.GET_BY_ID + id);
};

export const CreateQuiz = async (quiz) => {
  const tempQuiz = quiz.data;
  tempQuiz.questionList.forEach((question) => {
    question.correctAnswer =
      question.choicesList[question.correctAnswer].choice;
  });
  return await service.post(API.QUIZ.POST, tempQuiz);
};

export const useCreateQuiz = () => {
  return useMutation({
    mutationFn: CreateQuiz,
    mutationKey: [MUTATION_KEY.QUIZ.REMOVE],
  });
};

export const UpdateQuiz = async (quiz) => {
  const tempQuiz = quiz;
  tempQuiz.questionList.forEach((question) => {
    question.correctAnswer =
      question.choicesList[question.correctAnswer].choice;
  });
  console.log("temp:", tempQuiz);
  return await service.put(API.QUIZ.PUT + quiz.id, tempQuiz);
};

export const useUpdateQuiz = () => {
  return useMutation({
    mutationFn: UpdateQuiz,
    mutationKey: [MUTATION_KEY.QUIZ.UPDATE],
  });
};

export const DeleteQuiz = async (quizId) => {
  return await service.delete(API.QUIZ.DELETE + quizId);
};

export const useDeleteQuiz = () => {
  return useMutation({
    mutationFn: DeleteQuiz,
    mutationKey: [MUTATION_KEY.QUIZ.REMOVE],
  });
};
