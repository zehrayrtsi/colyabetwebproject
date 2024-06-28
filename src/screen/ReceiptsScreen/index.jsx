import { Button, Image, Row, Input, Modal, Col, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faGrip,
  faList,
  faPen,
  faReceipt,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ColyabetTable from "../../component/ColyabetTable/index.jsx";
import { useState } from "react";
import {
  useDeleteReceipt,
  useGetAllReceipts,
} from "../../api/ReceiptController/index.js";
import { API, BASE_URL } from "../../constant/api.js";
import CreateReceiptModal from "../../component/CreateModal/CreateReceiptModal/index.jsx";
import EditReceiptModal from "../../component/EditModal/EditReceiptModal/index.jsx";
import { ExclamationCircleFilled } from "@ant-design/icons";
import THEME from "../../constant/theme.js";
import ReceiptPreviewModal from "../../component/PreviewModal/ReceiptPreviewModal/index.jsx";
const { Search } = Input;

const ReceiptsScreen = () => {
  const [viewType, setViewType] = useState("LIST");
  const {
    data: receipts,
    isLoading,
    isRefetching,
    refetch,
  } = useGetAllReceipts();
  const [openNewReceipt, setOpenNewReceipt] = useState(false);
  const { mutate: remove, isPending } = useDeleteReceipt();
  const [receiptSearch, setReceiptSearch] = useState(undefined);
  const [editReceiptId, setEditReceiptId] = useState(undefined);
  const [previewReceiptId, setPreviewReceiptId] = useState(undefined);
  const [modal, contextHolder] = Modal.useModal();

  const processedData = receipts?.data
    ?.filter((receipt) => {
      if (
        receiptSearch === undefined ||
        receiptSearch === null ||
        receiptSearch?.trim().length === 0
      ) {
        return true;
      } else {
        return receipt.receiptName
          ?.toLowerCase()
          ?.includes(receiptSearch?.toLowerCase());
      }
    })
    .reverse()
    .map((receipt) => {
      return {
        key: receipt.id,
        name: receipt.receiptName,
        image: `${BASE_URL}${API.IMAGES.GET}${receipt?.imageId}`,
      };
    });

  const removeReceipt = (id) => {
    modal.confirm({
      title: "Tarifi Silmekte Emin misiniz ?",
      content: "Tarif silindikten sonra geri alınamaz !",
      okText: "Sil",
      cancelText: "Vazgeç",
      icon: <ExclamationCircleFilled style={{ color: THEME.Warning }} />,
      onOk: () => {
        remove(id, {
          onSuccess: () => {
            refetch();
            showNotification.success({
              message: "Tarif başarılı bir şekilde silindi !",
            });
          },
        });
      },
      centered: true,
    });
  };

  return (
    <div>
      {contextHolder}
      <CreateReceiptModal
        isOpen={openNewReceipt}
        setIsOpen={setOpenNewReceipt}
      />
      <EditReceiptModal
        selectedReceiptId={editReceiptId}
        setIsOpen={setEditReceiptId}
      />
      <ReceiptPreviewModal
        selectedReceiptId={previewReceiptId}
        setIsOpen={setPreviewReceiptId}
      />
      <Row
        style={{
          width: "100%",
          padding: 4,
          borderRadius: 12,
          marginBottom: 8,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600 }}>Tarifler</div>
        <Button
          type={"primary"}
          onClick={() => {
            setOpenNewReceipt(true);
          }}
        >
          <div style={{ fontSize: 16 }}>Yeni Tarif</div>
          <FontAwesomeIcon icon={faReceipt} fontSize={20} />
        </Button>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <div style={{ marginBottom: 16 }}>
          <Search
            allowClear
            placeholder="Tarif Ara..."
            onSearch={(value) => {
              setReceiptSearch(value);
            }}
            enterButton
          />
        </div>
        <Button
          onClick={() => {
            setViewType((p) => (p === "LIST" ? "GRID" : "LIST"));
          }}
          type={"primary"}
          shape={"circle"}
          icon={
            <FontAwesomeIcon icon={viewType === "LIST" ? faList : faGrip} />
          }
        />
      </Row>
      {viewType === "LIST" && (
        <ColyabetTable
          isLoading={isLoading || isRefetching || isPending}
          onAction={(type, row) => {
            switch (type) {
              case "VIEW":
                setPreviewReceiptId(row.key);
                break;
              case "EDIT":
                setEditReceiptId(row.key);
                break;
              case "DELETE":
                removeReceipt(row.key);
                break;
            }
          }}
          data={processedData}
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
          extraActions={[
            {
              type: "VIEW",
              icon: <FontAwesomeIcon icon={faEye} />,
            },
          ]}
        />
      )}
      {viewType === "GRID" && (
        <Row style={{ width: "100%" }} gutter={[16, 16]}>
          {processedData?.map((item) => {
            return (
              <Col key={item.key} span={8}>
                <Card
                  hoverable
                  // style={{ width: 240 }}
                  cover={<Image alt={item.name} src={item.image} />}
                >
                  <Card.Meta
                    title={item.name}
                    description={
                      <Row
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          gap: 24,
                        }}
                      >
                        <Button
                          onClick={() => {
                            setPreviewReceiptId(item.key);
                          }}
                          type={"primary"}
                          shape={"circle"}
                          icon={<FontAwesomeIcon icon={faEye} />}
                        />
                        <Button
                          onClick={() => {
                            setEditReceiptId(item.key);
                          }}
                          type={"primary"}
                          shape={"circle"}
                          icon={<FontAwesomeIcon icon={faPen} />}
                        />
                        <Button
                          onClick={() => {
                            removeReceipt(item.key);
                          }}
                          type={"primary"}
                          danger
                          shape={"circle"}
                          icon={<FontAwesomeIcon icon={faX} />}
                        />
                      </Row>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default ReceiptsScreen;
