import {
  Card,
  Image,
  List,
  Modal,
  notification,
  Row,
  Tag,
  Typography,
} from "antd";
import { GetBarcodeById } from "../../../api/BarcodeController/index.js";
import { useEffect, useState } from "react";
import { API, BASE_URL } from "../../../constant/api.js";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";

const BarcodePreview = ({ selectedBarcodeId, setIsOpen }) => {
  const [barcode, setBarcode] = useState({
    imageId: undefined,
    name: undefined,
    code: undefined,
    nutritionalValuesList: [],
    glutenFree: false,
  });
  const [showNotification, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  console.log(barcode);
  useEffect(() => {
    if (selectedBarcodeId) {
      setLoading(true);
      GetBarcodeById(selectedBarcodeId)
        .then((barcode) => {
          setBarcode(barcode.data);
          setLoading(false);
        })
        .catch((err) => {
          showNotification.error({
            message: "Barkodu getirirken hata. " + err.message,
            placement: "bottomRight",
          });
          setLoading(false);
        });
    }
  }, [selectedBarcodeId]);

  return (
    <Modal
      open={selectedBarcodeId !== undefined}
      onCancel={() => {
        setIsOpen(undefined);
      }}
      footer={null}
    >
      <LoadingIndicator visible={loading} />
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          {barcode?.name}
        </Row>
      </Row>
      <Card
        cover={
          <Image
            style={{ aspectRatio: 4 / 3, objectFit: "cover" }}
            alt={barcode?.name}
            src={`${BASE_URL}${API.IMAGES.GET}${barcode?.imageId}`}
          />
        }
      >
        <Card.Meta title={barcode?.code} />
        <List
          itemLayout="vertical"
          dataSource={barcode?.nutritionalValuesList}
          renderItem={(nutritionalValue) => (
            <List.Item>
              <Row style={{ fontSize: 24, fontWeight: 600, width: "100%" }}>
                {`${nutritionalValue.unit} - ${nutritionalValue.type}`}
              </Row>
              <Row style={{ fontSize: 12, fontWeight: 600, width: "100%" }}>
                Yağ (g):{" "}
                <div style={{ fontSize: 12, fontWeight: 400, marginLeft: 8 }}>
                  {nutritionalValue.fatAmount}
                </div>
              </Row>
              <Row style={{ fontSize: 12, fontWeight: 600, width: "100%" }}>
                Karbonhidrat (g):{" "}
                <div style={{ fontSize: 12, fontWeight: 400, marginLeft: 8 }}>
                  {nutritionalValue.carbohydrateAmount}
                </div>
              </Row>
              <Row style={{ fontSize: 12, fontWeight: 600, width: "100%" }}>
                Protein (g):{" "}
                <div style={{ fontSize: 12, fontWeight: 400, marginLeft: 8 }}>
                  {nutritionalValue.proteinAmount}
                </div>
              </Row>
              <Row style={{ fontSize: 12, fontWeight: 600, width: "100%" }}>
                Kalori (kcal):{" "}
                <div style={{ fontSize: 12, fontWeight: 400, marginLeft: 8 }}>
                  {nutritionalValue.calorieAmount}
                </div>
              </Row>
            </List.Item>
          )}
        />
        <Row style={{ fontSize: 12, fontWeight: 600, width: "100%" }}>
          <Tag color={barcode?.glutenFree ? "orange-inverse" : "green-inverse"}>
            {barcode?.glutenFree ? "Glütensiz" : "Glütenli"}
          </Tag>
        </Row>
      </Card>
    </Modal>
  );
};

export default BarcodePreview;
