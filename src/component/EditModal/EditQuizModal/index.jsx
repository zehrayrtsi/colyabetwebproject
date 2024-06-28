import { useEffect, useState } from "react";
import { Button, Modal, notification, Row } from "antd";
import {
  GetQuizById,
  UpdateQuiz,
  useUpdateQuiz,
} from "../../../api/QuizController/index.js";
import QuizForm from "../../Forms/QuizForm/index.jsx";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constant/query.js";

const EditQuizModal = ({ selectedQuizId, setIsOpen }) => {
  const client = useQueryClient();

  const [editQuiz, setEditQuiz] = useState({
    topicName: undefined,
    questionList: [],
  });
  const [showNotification, contextHolder] = notification.useNotification();
  const { mutate: updateQuiz, isPending } = useUpdateQuiz();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedQuizId) {
      setLoading(true);
      GetQuizById(selectedQuizId)
        .then((quiz) => {
          const tempQuiz = quiz.data;
          tempQuiz.questionList.forEach((question) => {
            question.choicesList.forEach((choice, index) => {
              if (choice.choice === question.correctAnswer) {
                question.correctAnswer = index;
              }
            });
          });
          setEditQuiz(tempQuiz);
          setLoading(false);
        })
        .catch((err) => {
          showNotification.error(err.message);
          setLoading(false);
        });
    }
  }, [selectedQuizId]);

  const validateFields = () => {
    if (
      editQuiz.topicName === undefined ||
      editQuiz.topicName?.trim().length === 0
    ) {
      showNotification.error({
        message: "Lütfen quiz adı alanını doldurunuz !",
        placement: "bottomRight",
      });
      return false;
    }
    for (const question of editQuiz.questionList) {
      if (question.question === undefined) {
        showNotification.error({
          message: "Lütfen soru alanlarını doldurunuz !",
          placement: "bottomRight",
        });
        return false;
      }
      if (question.correctAnswer === undefined) {
        showNotification.error({
          message: "Lütfen doğru şık alanını doldurunuz !",
          placement: "bottomRight",
        });
        return false;
      }
      for (const choice of question.choicesList) {
        if (choice.choice === undefined || choice.choice?.trim().length === 0) {
          showNotification.error({
            message: "Lütfen şık alanlarını doldurunuz !",
            placement: "bottomRight",
          });
          return false;
        }
      }
    }
    return true;
  };

  return (
    <Modal
      onCancel={() => {
        setIsOpen(undefined);
      }}
      width={600}
      open={selectedQuizId !== undefined}
      footer={null}
    >
      <LoadingIndicator visible={loading || isPending} />
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          Quiz Güncelle
        </Row>
        <QuizForm quiz={editQuiz} setQuiz={setEditQuiz} />
      </Row>
      <Row style={{ gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
        <Button
          onClick={() => {
            setIsOpen(undefined);
          }}
          type={"primary"}
        >
          İptal
        </Button>
        <Button
          onClick={() => {
            if (validateFields()) {
              console.log("validate", editQuiz);
              updateQuiz(editQuiz, {
                onSuccess: () => {
                  setEditQuiz({
                    topicName: undefined,
                    questionList: [],
                  });
                  setIsOpen(undefined);
                  client.invalidateQueries([QUERY_KEYS.QUIZ.GET_ALL]);
                },
              });
            }
          }}
          type={"primary"}
        >
          Güncelle
        </Button>
      </Row>
    </Modal>
  );
};

export default EditQuizModal;
