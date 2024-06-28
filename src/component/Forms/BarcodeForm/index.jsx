import { Button, Col, Input, InputNumber, Row, Switch, Upload } from "antd";
import { API, BASE_URL } from "../../../constant/api.js";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Nutritions from "../../Nutritions/index.jsx";
import { useState } from "react";

const BarcodeForm = ({ barcode, setBarcode }) => {
  const [loading, setLoading] = useState(false);
  console.log(barcode);
  return (
    <>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 16,
          width: "100%",
        }}
      >
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
              setBarcode({ ...barcode, imageId: info.file.response });
            }
          }}
        >
          {barcode.imageId ? (
            <img
              src={`${BASE_URL}${API.IMAGES.GET}${barcode.imageId}`}
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
      </Col>
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
            Ürün Adı:
          </div>
          <Input
            onChange={({ target }) => {
              setBarcode({ ...barcode, name: target.value });
            }}
            placeholder={"Ürün adını giriniz.."}
            value={barcode.name}
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
            Glutensiz:
          </div>
          <Switch
            value={barcode.glutenFree}
            onChange={(checked) => {
              setBarcode({ ...barcode, glutenFree: checked });
            }}
          />
        </Row>
      </Row>
      <Row style={{ width: "100%", marginBottom: 16 }}>
        <div
          style={{
            fontSize: 16,
            lineHeight: "32px",
            width: 110,
          }}
        >
          Barkod Kodu:
        </div>
        <InputNumber
          onChange={(value) => {
            setBarcode({ ...barcode, code: value });
          }}
          placeholder={"Barkod kodunu giriniz.."}
          value={barcode.code}
          style={{ flex: 1 }}
        />
      </Row>
      <Nutritions
        nutritions={barcode.nutritionalValuesList}
        onAdd={(nutrition) => {
          setBarcode({
            ...barcode,
            nutritionalValuesList: [
              ...barcode.nutritionalValuesList,
              nutrition,
            ],
          });
        }}
        onRemove={(index) => {
          const tempNutritionValuesList = [...barcode.nutritionalValuesList];
          tempNutritionValuesList.splice(index, 1);
          setBarcode({
            ...barcode,
            nutritionalValuesList: tempNutritionValuesList,
          });
        }}
      />
    </>
  );
};

export default BarcodeForm;
