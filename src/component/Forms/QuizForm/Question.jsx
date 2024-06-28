import { Input, Row, Select } from "antd";
import AnswerLine from "./AnswerLine.jsx";

const Question = ({ withImage, question, setQuestion, index }) => {
  return (
    <Row style={{ width: "100%", gap: 8 }}>
      <Row style={{ width: "100%" }}>
        <div style={{ width: "100%", fontSize: 16, fontWeight: 500 }}>
          Soru {index}:
        </div>
        <Input
          value={question.question}
          onChange={({ target }) => {
            setQuestion({ ...question, question: target.value });
          }}
        />
      </Row>
      <AnswerLine
        letter={"A"}
        question={question}
        setQuestion={setQuestion}
        index={0}
        withImage={withImage}
      />
      <AnswerLine
        letter={"B"}
        question={question}
        setQuestion={setQuestion}
        index={1}
        withImage={withImage}
      />
      <AnswerLine
        letter={"C"}
        question={question}
        setQuestion={setQuestion}
        index={2}
        withImage={withImage}
      />
      <AnswerLine
        letter={"D"}
        question={question}
        setQuestion={setQuestion}
        index={3}
        withImage={withImage}
      />
      <Row style={{ width: "100%" }}>
        <div style={{ width: "100%", fontSize: 16, fontWeight: 500 }}>
          Doğru Cevap
        </div>
        <Select
          onChange={(value) => {
            setQuestion({
              ...question,
              correctAnswer: value,
            });
          }}
          value={question.choicesList[question.correctAnswer]?.choice}
          options={[
            { label: question.choicesList[0].choice || "A", value: 0 },
            { label: question.choicesList[1].choice || "B", value: 1 },
            { label: question.choicesList[2].choice || "C", value: 2 },
            { label: question.choicesList[3].choice || "D", value: 3 },
          ]}
          style={{ width: "100%" }}
        />
      </Row>
    </Row>
  );
};

export default Question;
