import { Button, Modal, notification, Row } from "antd";
import { useState } from "react";

import { useAddNewReceipt } from "../../../api/ReceiptController/index.js";
import ReceiptForm from "../../Forms/ReceiptForm/index.jsx";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constant/query.js";

const CreateReceiptModal = ({ isOpen, setIsOpen }) => {
  const [newReceipt, setNewReceipt] = useState({
    receiptName: undefined,
    receiptDetails: undefined,
    imageId: undefined,
    receiptItems: undefined,
    nutritionalValuesList: undefined,
  });
  const [showNotification, contextHolder] = notification.useNotification();
  const { mutate: addNewReceipt } = useAddNewReceipt();
  const client = useQueryClient();
  const validateFields = () => {
    if (
      newReceipt.receiptName === undefined ||
      newReceipt?.receiptName.trim().length === 0
    ) {
      showNotification.error({
        message: "Lütfen tarif adı alanını doldurunuz !",
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
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          Yeni Tarif
        </Row>
        <ReceiptForm receipt={newReceipt} setReceipt={setNewReceipt} />
      </Row>
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
              addNewReceipt(newReceipt, {
                onSuccess: () => {
                  setNewReceipt({
                    receiptName: undefined,
                    receiptDetails: undefined,
                    imageId: undefined,
                    receiptItems: undefined,
                    nutritionalValuesList: undefined,
                  });
                  setIsOpen(false);
                  showNotification.success({
                    message: "Tarif başarılı bir şekilde oluşturuldu !",
                  });
                  client.invalidateQueries([QUERY_KEYS.RECEIPTS.GET_ALL]);
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
export default CreateReceiptModal;
