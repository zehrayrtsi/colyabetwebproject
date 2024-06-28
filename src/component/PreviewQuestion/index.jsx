import { Image, List, Row } from "antd";
import { API, BASE_URL } from "../../constant/api.js";

const ChoiseLetter = ["A", "B", "C", "D"];

const PreviewQuestion = ({ question, index }) => {
  const imageAvaibleInAllChoices =
    question?.choicesList?.find((choice) => choice.imageId === null) ===
    undefined;
  return (
    <Row style={{ width: "100%" }}>
      <Row style={{ width: "100%" }}>
        <div style={{ fontSize: 16, fontWeight: 500, marginRight: 8 }}>
          Soru {index + 1}:
        </div>
        <div style={{ lineHeight: "25px" }}>{question?.question}</div>
      </Row>
      <Row style={{ width: "100%" }}>
        <List
          style={{ width: "100%" }}
          grid={{ gutter: 16, column: 1 }}
          dataSource={question?.choicesList.map((choice, index) => {
            return { key: choice.id || `choice-${index}`, ...choice };
          })}
          renderItem={(choice, index) => {
            return (
              <List.Item style={{ width: "100%" }}>
                <Row style={{ width: "100%", gap: 16, alignItems: "center" }}>
                  {choice.imageId ? (
                    <Image
                      style={{ maxWidth: 64, minWidth: 64 }}
                      src={BASE_URL + API.IMAGES.GET + choice.imageId}
                    />
                  ) : imageAvaibleInAllChoices ? (
                    <div style={{ maxWidth: 64, minWidth: 64 }} />
                  ) : (
                    <></>
                  )}
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 500 }}>
                      {ChoiseLetter[index]}:
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 300,
                        marginLeft: 8,
                      }}
                    >
                      {choice.choice}
                    </span>
                  </div>
                </Row>
              </List.Item>
            );
          }}
        />
      </Row>
    </Row>
  );
};

export default PreviewQuestion;
