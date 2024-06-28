import { Row, Tabs } from "antd";
import { useState } from "react";
import TopFiveReceiptReportChart from "../../component/TopFiveReceiptReport/index.jsx";
import ReadyToFoodReportChart from "../../component/ReadyToFoodReportChart/index.jsx";
import ReceiptReportChart from "../../component/ReceiptReportChart/index.jsx";
import UserReports from "../../component/UserReports/index.jsx";

const UsersReportsScreen = () => {
  const [currentTab, setCurrentTab] = useState("receipt");
  return (
    <div>
      <Row
        style={{
          width: "100%",
          padding: 4,
          borderRadius: 12,
          marginBottom: 8,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600 }}>Raporlar</div>
      </Row>
      <div style={{ width: "100%" }}>
        {/*TODO: ADD TABS THEME COLOR IN APP.JSX*/}
        <Tabs
          onChange={(tabKey) => {
            setCurrentTab(tabKey);
          }}
          activeKey={currentTab}
          type="card"
          size={"middle"}
          items={[
            { label: "Tarif Raporları", key: "receipt" },
            { label: "Hazır Yemek Raporları", key: "readyFood" },
            { label: "Kullanıcı Raporları", key: "user" },
            { label: "En Çok Kullanılan 5 Tarif", key: "topFive" },
          ]}
        />
      </div>
      {currentTab === "receipt" && <ReceiptReportChart />}
      {currentTab === "readyFood" && <ReadyToFoodReportChart />}
      {currentTab === "user" && <UserReports />}
      {currentTab === "topFive" && <TopFiveReceiptReportChart />}
    </div>
  );
};

export default UsersReportsScreen;
