import { useState } from "react";
import { Button, Input, Row, Upload } from "antd";
import { API, BASE_URL } from "../../../constant/api.js";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const AnswerLine = ({ index, letter, withImage, setQuestion, question }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Row style={{ width: "100%", gap: 8 }}>
      <div style={{ width: "100%", fontSize: 16, fontWeight: 500 }}>
        {letter} Şıkkı:
      </div>
      {withImage && (
        <Upload
          name="file"
          listType="picture"
          className="avatar-uploader"
          showUploadList={false}
          action={`${BASE_URL}${API.IMAGES.POST}`}
          onChange={(info) => {
            if (info.file.status === "uploading") {
              setLoading(true);
              return;
            }
            if (info.file.status === "done") {
              setLoading(false);
              const tempChoicesList = [...question.choicesList];
              tempChoicesList.splice(index, 1, {
                choice: tempChoicesList[index].choice,
                imageId: info.file.response,
              });
              setQuestion({ ...question, choicesList: tempChoicesList });
            }
          }}
        >
          {question.choicesList[index].imageId ? (
            <img
              src={`${BASE_URL}${API.IMAGES.GET}${question.choicesList[index].imageId}`}
              alt="avatar"
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            />
          ) : (
            <Button type="dashed" style={{}}>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div>Upload</div>
            </Button>
          )}
        </Upload>
      )}
      <Input
        value={question.choicesList[index]?.choice}
        onChange={({ target }) => {
          const tempChoicesList = [...question.choicesList];
          tempChoicesList.splice(index, 1, {
            choice: target.value,
            imageId: tempChoicesList[index].imageId,
          });
          setQuestion({ ...question, choicesList: tempChoicesList });
        }}
      />
    </Row>
  );
};

export default AnswerLine;
