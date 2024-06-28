import ColyabetTable from "../../component/ColyabetTable/index.jsx";
import { Button, Card, Col, Image, Modal, notification, Row, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faEye,
  faGrip,
  faList,
  faPen,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useDeleteBarcode,
  useGetAllBarcodes,
} from "../../api/BarcodeController/index.js";
import { API, BASE_URL } from "../../constant/api.js";
import CreateBarcodeModal from "../../component/CreateModal/CreateBarcodeModal/index.jsx";
import EditBarcodeModal from "../../component/EditModal/EditBarcodeModal/index.jsx";
import { ExclamationCircleFilled } from "@ant-design/icons";
import THEME from "../../constant/theme.js";
import BarcodePreview from "../../component/PreviewModal/BarcodePreviewModal/index.jsx";

const BarcodeScreen = () => {
  const [viewType, setViewType] = useState("LIST");
  const {
    data: barcodes,
    isLoading,
    refetch,
    isRefetching,
  } = useGetAllBarcodes();
  const { mutate: remove, isPending } = useDeleteBarcode();
  const [showNewBarcode, setShowNewBarcode] = useState(false);
  const [editBarcodeId, setEditBarcodeId] = useState(undefined);
  const [previewBarcodeId, setPreviewBarcodeId] = useState(undefined);
  const [modal, contextHolder] = Modal.useModal();
  const [showNotification, contextHolderNotification] =
    notification.useNotification();

  const removeBarcode = (id) => {
    modal.confirm({
      title: "Barkodu Silmekte Emin misiniz ?",
      content: "Barkod silindikten sonra geri alınamaz !",
      okText: "Sil",
      cancelText: "Vazgeç",
      icon: <ExclamationCircleFilled style={{ color: THEME.Warning }} />,
      onOk: () => {
        remove(id, {
          onSuccess: () => {
            refetch();
            showNotification.success({
              message: "Barkod başarılı bir şekilde silindi !",
            });
          },
        });
      },
      centered: true,
    });
  };

  const processedData = barcodes?.data?.map((barcode) => {
    return {
      key: barcode.id,
      name: barcode.name,
      barcode: barcode.code,
      glutenFree: barcode.glutenFree,
      image: `${BASE_URL}${API.IMAGES.GET}${barcode?.imageId}`,
    };
  });

  return (
    <div>
      {contextHolder}
      {contextHolderNotification}
      <CreateBarcodeModal
        isOpen={showNewBarcode}
        setIsOpen={setShowNewBarcode}
      />
      <EditBarcodeModal
        selectedBarcodeId={editBarcodeId}
        setIsOpen={setEditBarcodeId}
      />
      <BarcodePreview
        selectedBarcodeId={previewBarcodeId}
        setIsOpen={setPreviewBarcodeId}
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
        <div style={{ fontSize: 32, fontWeight: 600 }}>Barkod Ekle</div>
        <Button
          onClick={() => {
            setShowNewBarcode(true);
          }}
          type={"primary"}
        >
          <div style={{ fontSize: 16 }}>Yeni Barkod</div>
          <FontAwesomeIcon icon={faBarcode} fontSize={20} />
        </Button>
      </Row>
      <Row style={{ justifyContent: "flex-end", marginBottom: 16 }}>
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
                setPreviewBarcodeId(row.key);
                break;
              case "EDIT":
                setEditBarcodeId(row.key);
                break;
              case "DELETE":
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
                console.log(row);
                return <Image src={row.image} />;
              },
            },
            { title: "İsim", dataIndex: "name", key: "name" },
            {
              title: "Glutensiz",
              dataIndex: "glutenFree",
              key: "glutenFree",
              render: (text, row) => {
                return row.glutenFree ? (
                  <Tag color={"green-inverse"}>Glutensiz</Tag>
                ) : (
                  <Tag color={"orange-inverse"}>Glutenli</Tag>
                );
              },
            },
            {
              title: "Barkod",
              dataIndex: "barcode",
              key: "barcode",
            },
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
              <Col style={{ alignSelf: "stretch" }} key={item.key} span={8}>
                <Card
                  hoverable
                  cover={
                    <Image
                      style={{ height: 360, minHeight: 360 }}
                      alt={item.name}
                      src={item.image}
                    />
                  }
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
                        <Row style={{ width: "100%" }}>{item.barcode}</Row>
                        <Button
                          onClick={() => {
                            setPreviewBarcodeId(item.key);
                          }}
                          type={"primary"}
                          shape={"circle"}
                          icon={<FontAwesomeIcon icon={faEye} />}
                        />
                        <Button
                          onClick={() => {
                            setEditBarcodeId(item.key);
                          }}
                          type={"primary"}
                          shape={"circle"}
                          icon={<FontAwesomeIcon icon={faPen} />}
                        />
                        <Button
                          onClick={() => {
                            removeBarcode(item.key);
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

export default BarcodeScreen;
