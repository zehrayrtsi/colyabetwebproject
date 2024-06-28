import { Button, Modal, notification, Row } from "antd";
import { useState } from "react";
import { useAddNewBarcode } from "../../../api/BarcodeController/index.js";
import BarcodeForm from "../../Forms/BarcodeForm/index.jsx";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";
import QUERY_KEYS from "../../../constant/query.js";
import { useQueryClient } from "@tanstack/react-query";

const CreateBarcodeModal = ({ isOpen, setIsOpen }) => {
  const [showNotification, contextHolder] = notification.useNotification();

  const [newBarcode, setNewBarcode] = useState({
    imageId: undefined,
    name: undefined,
    code: undefined,
    nutritionalValuesList: [],
    glutenFree: false,
  });
  const { mutate: addNewBarcode, isPending } = useAddNewBarcode();
  const client = useQueryClient();

  const validateFields = () => {
    if (newBarcode.name === undefined || newBarcode.name?.trim().length === 0) {
      showNotification.error({
        message: "Lütfen ürün adı alanını doldurunuz !",
        placement: "bottomRight",
      });
      return false;
    }
    if (newBarcode.code === undefined) {
      showNotification.error({
        message: "Lütfen ürün barkod alanını doldurunuz !",
        placement: "bottomRight",
      });
      return false;
    }
    return true;
  };

  return (
    <Modal
      onCancel={() => {
        setIsOpen(false);
      }}
      width={600}
      open={isOpen}
      footer={null}
    >
      <LoadingIndicator visible={isPending} />
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          Yeni Barcode
        </Row>
      </Row>
      <BarcodeForm barcode={newBarcode} setBarcode={setNewBarcode} />
      <Row style={{ gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
          type={"primary"}
        >
          İptal
        </Button>
        <Button
          onClick={() => {
            if (validateFields()) {
              addNewBarcode(newBarcode, {
                onSuccess: () => {
                  setNewBarcode({
                    name: undefined,
                    code: undefined,
                    nutritionalValuesList: [],
                    glutenFree: false,
                  });
                  setIsOpen(false);
                  showNotification.success({
                    message: "Barkod başarılı bir şekilde oluşturuldu !",
                  });
                  client.invalidateQueries([QUERY_KEYS.BARCODES.GET_ALL]);
                },
              });
            }
          }}
          type={"primary"}
        >
          Oluştur
        </Button>
      </Row>
    </Modal>
  );
};

export default CreateBarcodeModal;
