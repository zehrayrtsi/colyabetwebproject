import { Button, Col, Input, InputNumber, Row, Select } from "antd";
import { useGetAllTypes } from "../../../api/ReceiptController/index.js";
import ColyabetTable from "../../ColyabetTable/index.jsx";
import { useState } from "react";
import THEME from "../../../constant/theme.js";
// product name - unit - type
const ReceiptIngredients = ({
  ingredients = [],
  onAdd = (ingredient) => {},
  onRemove = (index) => {},
}) => {
  const { data, isLoading } = useGetAllTypes();
  const [ingredient, setIngredient] = useState({
    productName: undefined,
    unit: undefined,
    type: undefined,
  });
  const [showAdd, setShowAdd] = useState(false);

  return (
    <Row style={{ width: "100%" }}>
      <ColyabetTable
        data={ingredients.map((ingredient, index) => {
          return {
            key: ingredient.id || `ingredient-id-${index}`,
            productName: ingredient.productName,
            type: ingredient.type,
            unit: ingredient.unit,
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
            key: "productName",
            title: "Malzeme Adı",
            dataIndex: "productName",
            width: "80%",
          },
          {
            key: "type",
            title: "Tip",
            dataIndex: "type",
          },
          {
            key: "unit",
            title: "Miktar",
            dataIndex: "unit",
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
            Yeni Malzeme
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
            <Col span={24}>
              <Row>Malzeme Adı</Row>
              <Input
                value={ingredient.productName}
                onChange={(e) => {
                  setIngredient({ ...ingredient, productName: e.target.value });
                }}
              />
            </Col>
            <Col span={12}>
              <Row>Tip</Row>
              <Select
                style={{ width: "100%" }}
                loading={isLoading}
                options={data?.data?.map((type) => {
                  return { value: type, label: type };
                })}
                value={ingredient.type}
                onChange={(e) => {
                  setIngredient({ ...ingredient, type: e });
                }}
              />
            </Col>
            <Col span={12}>
              <Row>Miktar</Row>
              <InputNumber
                value={ingredient.unit}
                onChange={(value) => {
                  setIngredient({ ...ingredient, unit: value });
                  console.log(value);
                }}
                controls={true}
                style={{ width: "100%" }}
              />
            </Col>
            <Col
              span={2}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
              }}
            >
              <Button
                disabled={
                  ingredient.productName === undefined ||
                  ingredient.productName?.trim().length === 0 ||
                  ingredient.unit === undefined ||
                  ingredient.type === undefined
                }
                onClick={() => {
                  onAdd(ingredient);
                  setIngredient({
                    productName: undefined,
                    unit: undefined,
                    type: undefined,
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

export default ReceiptIngredients;
