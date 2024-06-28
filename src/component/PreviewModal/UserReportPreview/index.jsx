import { Card, Descriptions, List, Modal, Row } from "antd";
import { FOOD_TYPE } from "../../../constant/dictionary.js";

const UserPreviewModal = ({ report, setReport }) => {
  const reportDate = new Date(report?.dateTime);
  const eatingTime = new Date(report?.bolus?.eatingTime);
  return (
    <Modal
      closable={false}
      footer={null}
      open={report !== undefined}
      onCancel={() => {
        setReport(undefined);
      }}
      width={"80%"}
    >
      <Row style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Kullanıcı Raporu</div>
      </Row>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={[report]}
        renderItem={(report) => (
          <List.Item>
            <Card
              title={report.userName}
              extra={`${reportDate.toLocaleDateString("tr-TR")} - ${reportDate.toLocaleTimeString("tr-TR")}`}
            >
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="Kan Şekeri">
                  {report.bolus.bloodSugar}
                </Descriptions.Item>
                <Descriptions.Item label="Hedef Kan Şekeri">
                  {report.bolus.targetBloodSugar}
                </Descriptions.Item>
                <Descriptions.Item label="İnsülin Tolerans Faktörü">
                  {report.bolus.insulinTolerateFactor}
                </Descriptions.Item>
                <Descriptions.Item label="Toplam Karbonhidrat">
                  {report.bolus.totalCarbonhydrate}
                </Descriptions.Item>
                <Descriptions.Item label="İnsülin Karbonhidrat Oranı">
                  {report.bolus.insulinCarbonhydrateRatio}
                </Descriptions.Item>
                <Descriptions.Item label="Bolus Değeri">
                  {report.bolus.bolusValue}
                </Descriptions.Item>
                <Descriptions.Item label="Yeme Zamanı">
                  {`${eatingTime.toLocaleDateString("tr-TR")} - ${eatingTime.toLocaleTimeString("tr-TR")}`}
                </Descriptions.Item>
              </Descriptions>
              <Card
                title="Yemek Listesi"
                bordered={false}
                size="small"
                style={{ marginTop: 16 }}
              >
                {report.foodResponseList.map((item) => (
                  <Card
                    type="inner"
                    key={item.foodName}
                    title={item.foodName}
                    size="small"
                    style={{ marginBottom: 16 }}
                  >
                    <Descriptions bordered column={1} size="small">
                      <Descriptions.Item label="Yemek Tipi">
                        {FOOD_TYPE[item.foodType] || item.foodType}
                      </Descriptions.Item>
                      <Descriptions.Item label="Karbonhidrat">
                        {item.carbonhydrate}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                ))}
              </Card>
            </Card>
          </List.Item>
        )}
      />
    </Modal>
  );
};
export default UserPreviewModal;
