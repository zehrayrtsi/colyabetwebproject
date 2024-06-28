import { Button, Input, List, Row, Typography } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import THEME from "../../../constant/theme.js";
import ColyabetTable from "../../ColyabetTable/index.jsx";
const { TextArea } = Input;

const ReceiptSteps = ({
  steps = [],
  onAdd = (step) => {},
  onRemove = (index, item) => {},
}) => {
  const [newStep, setNewStep] = useState();
  const [showAdd, setShowAdd] = useState(false);
  return (
    <Row style={{ width: "100%", flexDirection: "column" }}>
      <Row style={{ width: "100%", flexDirection: "column" }}>
        <ColyabetTable
          data={steps.map((step, index) => {
            return {
              key: `step-index-${index}`,
              step: step,
              index: index + 1,
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
              key: "index",
              title: "No",
              dataIndex: "index",
            },
            {
              key: "step",
              title: "Adım",
              dataIndex: "step",
              width: "80%",
            },
          ]}
        />
      </Row>
      {!showAdd && (
        <Row style={{ justifyContent: "center", marginTop: 8 }}>
          <Button
            onClick={() => {
              setShowAdd(true);
            }}
            type={"primary"}
          >
            Yeni Adım
          </Button>
        </Row>
      )}
      {showAdd && (
        <Row style={{ marginTop: 8 }}>
          <Typography style={{ fontSize: 16, fontWeight: 500 }}>
            Yeni Adım:
          </Typography>
          <TextArea
            style={{ marginBottom: 4 }}
            showCount
            maxLength={100}
            onChange={({ target }) => {
              setNewStep(target.value);
            }}
            value={newStep}
            placeholder="Lütfen adım bilgisi giriniz !"
          />
          <Row style={{ gap: 8 }}>
            <Button
              disabled={newStep === undefined || newStep?.trim().length === 0}
              onClick={() => {
                onAdd(newStep);
                setNewStep(undefined);
                setShowAdd(false);
              }}
              type="primary"
            >
              Ekle
            </Button>
            <Button
              onClick={() => {
                setShowAdd(false);
              }}
              type="primary"
            >
              İptal
            </Button>
          </Row>
        </Row>
      )}
    </Row>
  );
};

export default ReceiptSteps;
