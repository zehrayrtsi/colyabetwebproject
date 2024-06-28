import { Image, Row } from "antd";
import { useTopFiveReceipts } from "../../api/MealController/index.jsx";
import ColyabetTable from "../ColyabetTable/index.jsx";
import { API, BASE_URL } from "../../constant/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ReceiptPreviewModal from "../PreviewModal/ReceiptPreviewModal/index.jsx";
import { useState } from "react";

const TopFiveReceiptReportChart = () => {
  const { data: topFiveReceipts, isFetching } = useTopFiveReceipts();
  const [previewReceiptId, setPreviewReceiptId] = useState(undefined);
  return (
    <Row style={{ width: "100%" }}>
      <ReceiptPreviewModal
        selectedReceiptId={previewReceiptId}
        setIsOpen={setPreviewReceiptId}
      />
      <ColyabetTable
        onAction={(type, row) => {
          setPreviewReceiptId(row.key);
        }}
        isLoading={isFetching}
        showEdit={false}
        showDelete={false}
        columns={[
          {
            width: 64,
            title: "",
            dataIndex: "image",
            key: "image",
            render: (text, row) => {
              return <Image src={row.image} />;
            },
          },
          { title: "İsim", dataIndex: "name", key: "name" },
        ]}
        data={topFiveReceipts?.data?.map((receipt) => {
          return {
            key: receipt.id,
            name: receipt.receiptName,
            image: `${BASE_URL}${API.IMAGES.GET}${receipt.imageId}`,
          };
        })}
        extraActions={[
          {
            type: "VIEW",
            icon: <FontAwesomeIcon icon={faEye} />,
          },
        ]}
      />
    </Row>
  );
};

export default TopFiveReceiptReportChart;
