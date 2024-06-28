import { useEffect, useState } from "react";
import { Button, Modal, notification, Row, Tabs } from "antd";
import { GetQuizById } from "../../../api/QuizController/index.js";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";
import PreviewQuestion from "../../PreviewQuestion/index.jsx";

const QuizPreviewModal = ({ selectedQuizId, setIsOpen }) => {
  const [quiz, setQuiz] = useState({
    topicName: undefined,
    questionList: [],
  });
  const [showNotification, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

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
          setQuiz(tempQuiz);
          setLoading(false);
        })
        .catch((err) => {
          showNotification.error(err.message);
          setLoading(false);
        });
    }
  }, [selectedQuizId]);

  return (
    <Modal
      onCancel={() => {
        setIsOpen(undefined);
      }}
      width={600}
      open={selectedQuizId !== undefined}
      footer={null}
    >
      <LoadingIndicator visible={loading} />
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          {loading ? "Quiz Yükleniyor" : quiz.topicName}
        </Row>
        <Row style={{ width: "100%" }}>
          <Tabs
            style={{ width: "100%" }}
            type={"card"}
            activeKey={selectedQuestionIndex}
            items={quiz?.questionList?.map((_, index) => {
              return { key: index, label: `Soru ${index + 1}:` };
            })}
            onChange={(key) => {
              setSelectedQuestionIndex(Number.parseInt(key));
            }}
          />
        </Row>
        <PreviewQuestion
          question={quiz?.questionList[selectedQuestionIndex]}
          index={selectedQuestionIndex}
        />
      </Row>
    </Modal>
  );
};

export default QuizPreviewModal;
