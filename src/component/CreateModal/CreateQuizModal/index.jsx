import { useState } from "react";
import { Button, Modal, notification, Row } from "antd";
import { useCreateQuiz } from "../../../api/QuizController/index.js";
import QuizForm from "../../Forms/QuizForm/index.jsx";
import QUERY_KEYS from "../../../constant/query.js";
import { useQueryClient } from "@tanstack/react-query";

const CreateQuizModal = ({ isOpen, setIsOpen }) => {
  const [newQuiz, setNewQuiz] = useState({
    topicName: undefined,
    questionList: [],
  });
  const [showNotification, contextHolder] = notification.useNotification();
  const { mutate: addNewQuiz } = useCreateQuiz();
  const client = useQueryClient();

  const validateFields = () => {
    if (
      newQuiz.topicName === undefined ||
      newQuiz.topicName?.trim().length === 0
    ) {
      showNotification.error({
        message: "Lütfen quiz adı alanını doldurunuz !",
        placement: "bottomRight",
      });
      return false;
    }
    for (const question of newQuiz.questionList) {
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
        setIsOpen(false);
      }}
      width={600}
      open={isOpen}
      footer={null}
    >
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          Yeni Quiz
        </Row>
        <QuizForm quiz={newQuiz} setQuiz={setNewQuiz} />
      </Row>
      <Row style={{ gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
          type={"primary"}
        >
          İptal
        </Button>
        <Button
          onClick={() => {
            if (validateFields()) {
              addNewQuiz(newQuiz, {
                onSuccess: () => {
                  setNewQuiz({
                    topicName: undefined,
                    questionList: [],
                  });
                  setIsOpen(false);
                  showNotification.success({
                    message: "Quiz başarılı bir şekilde oluşturuldu !",
                  });
                  client.invalidateQueries([QUERY_KEYS.QUIZ.GET_ALL]);
                },
              });
            }
          }}
          type={"primary"}
        >
          Oluştur
        </Button>
      </Row>
    </Modal>
  );
};

export default CreateQuizModal;
