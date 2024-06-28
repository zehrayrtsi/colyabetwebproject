import { Button, Col, Input, Row, Tabs, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ReceiptSteps from "./ReceiptSteps.jsx";
import ReceiptIngredients from "./ReceiptIngredients.jsx";
import ReceiptNutritions from "../../Nutritions/index.jsx";
import { useState } from "react";
import { API, BASE_URL } from "../../../constant/api.js";
const ReceiptForm = ({ receipt, setReceipt }) => {
  const [step, setStep] = useState("0");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Row style={{ marginBottom: 8, width: "100%" }}>
        <Col
          style={{ display: "flex", justifyContent: "center", marginRight: 32 }}
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
                setReceipt({ ...receipt, imageId: info.file.response });
              }
            }}
          >
            {receipt.imageId ? (
              <img
                src={`${BASE_URL}${API.IMAGES.GET}${receipt.imageId}`}
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
        <div style={{ fontSize: 16, lineHeight: "32px", marginRight: 8 }}>
          Tarif Adı:
        </div>
        <Input
          style={{ flex: 1, height: 32 }}
          value={receipt.receiptName}
          onChange={({ target }) => {
            setReceipt({ ...receipt, receiptName: target.value });
          }}
        />
      </Row>
      <Tabs
        value={step}
        items={[
          {
            key: "0",
            label: "Tarif Adminlari",
          },
          {
            key: "1",
            label: "Malzemeler",
          },
          {
            key: "2",
            label: "Besin Icerikleri",
          },
        ]}
        onChange={(key) => {
          setStep(key);
        }}
      />
      {step === "0" && (
        <ReceiptSteps
          steps={receipt.receiptDetails}
          onAdd={(step) => {
            setReceipt({
              ...receipt,
              receiptDetails: [...(receipt.receiptDetails || []), step],
            });
            console.log(step);
          }}
          onRemove={(index) => {
            const receiptSteps = [...receipt.receiptDetails];
            receiptSteps.splice(index, 1);
            setReceipt({
              ...receipt,
              receiptDetails: receiptSteps,
            });
          }}
        />
      )}
      {step === "1" && (
        <ReceiptIngredients
          ingredients={receipt.receiptItems}
          onAdd={(ingredient) => {
            setReceipt({
              ...receipt,
              receiptItems: [...(receipt.receiptItems || []), ingredient],
            });
          }}
          onRemove={(index) => {
            const receiptIngredient = [...receipt.receiptItems];
            receiptIngredient.splice(index, 1);
            setReceipt({
              ...receipt,
              receiptItems: receiptIngredient,
            });
          }}
        />
      )}

      {step === "2" && (
        <ReceiptNutritions
          nutritions={receipt.nutritionalValuesList}
          onAdd={(nutrition) => {
            setReceipt({
              ...receipt,
              nutritionalValuesList: [
                ...(receipt.nutritionalValuesList || []),
                nutrition,
              ],
            });
          }}
          onRemove={(index) => {
            const receiptNutritionalValuesList = [
              ...receipt.nutritionalValuesList,
            ];
            receiptNutritionalValuesList.splice(index, 1);
            setReceipt({
              ...receipt,
              nutritionalValuesList: receiptNutritionalValuesList,
            });
          }}
        />
      )}
    </>
  );
};

export default ReceiptForm;
