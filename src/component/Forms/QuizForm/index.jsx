import { Input, Row, Switch, Tabs } from "antd";
import { useState } from "react";
import NewQuestion from "./NewQuestion.jsx";
import Question from "./Question.jsx";

const QuizForm = ({ quiz, setQuiz }) => {
  const questionList = quiz.questionList || [];
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [withImage, setWithImage] = useState(false);
  return (
    <>
      <Row
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Row style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 16,
              lineHeight: "32px",
              width: 80,
            }}
          >
            Quiz Adı:
          </div>
          <Input
            onChange={({ target }) => {
              setQuiz({ ...quiz, topicName: target.value });
            }}
            placeholder={"Quiz adını giriniz.."}
            value={quiz?.topicName}
            style={{ flex: 1 }}
          />
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 16,
          }}
        >
          <div
            style={{
              fontSize: 16,
              lineHeight: "32px",
              width: 80,
            }}
          >
            Resimli:
          </div>
          <Switch
            value={withImage}
            onChange={(checked) => {
              setWithImage(checked);
            }}
          />
        </Row>
      </Row>
      <div style={{ width: "100%" }}>
        <Tabs
          type={"card"}
          activeKey={selectedQuestionIndex}
          items={[
            ...questionList.map((_, index) => {
              return { key: index, label: `Soru ${index + 1}:` };
            }),
            {
              key: questionList.length,
              label: "Yeni Soru",
            },
          ]}
          onChange={(key) => {
            setSelectedQuestionIndex(Number.parseInt(key));
          }}
        />
      </div>
      {questionList.length > 0 &&
        selectedQuestionIndex !== questionList.length && (
          <Question
            //questionListLength={questionList.length}
            withImage={withImage}
            question={questionList[selectedQuestionIndex]}
            setQuestion={(question) => {
              const tempQuestionList = [...questionList];
              tempQuestionList[selectedQuestionIndex] = question;
              setQuiz({ ...quiz, questionList: tempQuestionList });
              console.log(question);
            }}
            index={selectedQuestionIndex + 1}
          />
        )}
      {selectedQuestionIndex === questionList.length && (
        <NewQuestion
          questionListLength={questionList.length}
          onAdd={(question) => {
            setQuiz({ ...quiz, questionList: [...questionList, question] });
            setSelectedQuestionIndex(selectedQuestionIndex + 1);
          }}
          withImage={withImage}
        />
      )}
    </>
  );
};

export default QuizForm;
