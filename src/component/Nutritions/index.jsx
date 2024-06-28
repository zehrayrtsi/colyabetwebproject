import { Button, Col, Input, InputNumber, Row, Select } from "antd";
import { useState } from "react";
import ColyabetTable from "../ColyabetTable/index.jsx";
import THEME from "../../constant/theme.js";

const Nutritions = ({
  nutritions = [],
  onAdd = (nutrition) => {},
  onRemove = (index) => {},
}) => {
  const [nutrition, setNutrition] = useState({
    type: undefined,
    fatAmount: undefined,
    carbohydrateAmount: undefined,
    proteinAmount: undefined,
    calorieAmount: undefined,
  });
  const [showAdd, setShowAdd] = useState(false);

  return (
    <Row style={{ width: "100%" }}>
      <ColyabetTable
        data={nutritions?.map((nutrition, index) => {
          return {
            key: nutrition.id || `nutrition-${index}`,
            type: nutrition.type,
            amount: nutrition.amount,
            fatAmount: nutrition.fatAmount,
            carbohydrateAmount: nutrition.carbohydrateAmount,
            proteinAmount: nutrition.proteinAmount,
            calorieAmount: nutrition.calorieAmount,
          };
        })}
        showEdit={false}
        onAction={(type, row, index) => {
          if (type === "DELETE") {
            onRemove(index);
          }
        }}
        columns={[
          {
            key: "type",
            title: "Tip",
            dataIndex: "type",
          },
          {
            key: "amount",
            title: "Miktar",
            dataIndex: "amount",
          },
          {
            key: "fatAmount",
            title: "Yağ (g)",
            dataIndex: "fatAmount",
          },
          {
            key: "carbohydrateAmount",
            title: "Karbonhidrat (g)",
            dataIndex: "carbohydrateAmount",
          },
          {
            key: "proteinAmount",
            title: "Protein (g)",
            dataIndex: "proteinAmount",
          },
          {
            key: "calorieAmount",
            title: "Kalori (g)",
            dataIndex: "calorieAmount",
          },
        ]}
      />
      {!showAdd && (
        <Row style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
          <Button
            onClick={() => {
              setShowAdd(true);
            }}
            type={"primary"}
          >
            Yeni Besin İçeriği
          </Button>
        </Row>
      )}
      {showAdd && (
        <Row style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
          <Row
            gutter={[16, 16]}
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: THEME.Grey,
            }}
          >
            <Col span={12}>
              <Row>Besin Tipi</Row>
              <Input
                value={nutrition.type}
                onChange={(e) => {
                  setNutrition({ ...nutrition, type: e.target.value });
                }}
              />
            </Col>
            <Col span={12}>
              <Row>Besin Değeri Miktarı</Row>
              <InputNumber
                value={nutrition.amount}
                onChange={(value) => {
                  setNutrition({ ...nutrition, amount: value });
                }}
                controls={true}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Row>Yağ (g)</Row>
              <InputNumber
                value={nutrition.fatAmount}
                onChange={(value) => {
                  setNutrition({ ...nutrition, fatAmount: value });
                  console.log(value);
                }}
                controls={true}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Row>Karbonhidrat (g)</Row>
              <InputNumber
                value={nutrition.carbohydrateAmount}
                onChange={(value) => {
                  setNutrition({ ...nutrition, carbohydrateAmount: value });
                  console.log(value);
                }}
                controls={true}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Row>Protein (g)</Row>
              <InputNumber
                value={nutrition.proteinAmount}
                onChange={(value) => {
                  setNutrition({ ...nutrition, proteinAmount: value });
                  console.log(value);
                }}
                controls={true}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={12}>
              <Row>Kalori (g)</Row>
              <InputNumber
                value={nutrition.calorieAmount}
                onChange={(value) => {
                  setNutrition({ ...nutrition, calorieAmount: value });
                  console.log(value);
                }}
                controls={true}
                style={{ width: "100%" }}
              />
            </Col>
            <Col
              span={24}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                justifyContent: "center",
              }}
            >
              <Button
                disabled={
                  nutrition.type === undefined ||
                  nutrition.type?.trim().length === 0 ||
                  nutrition.fatAmount === undefined ||
                  nutrition.proteinAmount === undefined ||
                  nutrition.calorieAmount === undefined ||
                  nutrition.carbohydrateAmount === undefined
                }
                onClick={() => {
                  onAdd(nutrition);
                  setNutrition({
                    type: undefined,
                    fatAmount: undefined,
                    carbohydrateAmount: undefined,
                    proteinAmount: undefined,
                    calorieAmount: undefined,
                  });
                  setShowAdd(false);
                }}
                type={"primary"}
              >
                Ekle
              </Button>
              <Button
                onClick={() => {
                  setShowAdd(false);
                }}
                type={"primary"}
              >
                İptal
              </Button>
            </Col>
          </Row>
        </Row>
      )}
    </Row>
  );
};

export default Nutritions;
