import { Button, Row } from "antd";
import { useState } from "react";
import Question from "./Question.jsx";

const NewQuestion = ({ onAdd, questionListLength, withImage }) => {
  const [question, setQuestion] = useState({
    choicesList: [
      { choice: undefined, imageId: undefined },
      { choice: undefined, imageId: undefined },
      { choice: undefined, imageId: undefined },
      { choice: undefined, imageId: undefined },
    ],
    question: undefined,
    correctAnswer: undefined,
  });

  return (
    <Row style={{ width: "100%", gap: 8 }}>
      <Question
        question={question}
        setQuestion={setQuestion}
        index={questionListLength + 1}
        withImage={withImage}
      />
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Button
          disabled={
            question.question === undefined ||
            question.question?.trim().length === 0 ||
            question.choicesList.find((choice) => {
              return choice.choice === undefined;
            }) ||
            question.correctAnswer === undefined
          }
          type={"primary"}
          onClick={() => {
            onAdd(question);
            setQuestion({
              choicesList: [
                { choice: undefined, imageId: undefined },
                { choice: undefined, imageId: undefined },
                { choice: undefined, imageId: undefined },
                { choice: undefined, imageId: undefined },
              ],
              question: undefined,
              correctAnswer: undefined,
            });
          }}
        >
          Soru Ekle
        </Button>
      </Row>
    </Row>
  );
};

export default NewQuestion;
