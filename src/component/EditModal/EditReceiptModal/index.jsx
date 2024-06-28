import { Button, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";

import ReceiptForm from "../../Forms/ReceiptForm/index.jsx";
import {
  GetReceiptById,
  useUpdateReceipt,
} from "../../../api/ReceiptController/index.js";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constant/query.js";

const EditReceiptModal = ({ selectedReceiptId, setIsOpen }) => {
  const client = useQueryClient();

  const [editReceipt, setEditReceipt] = useState({
    receiptName: undefined,
    receiptDetails: undefined,
    imageId: undefined,
    receiptItems: undefined,
    nutritionalValuesList: undefined,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedReceiptId) {
      setLoading(true);
      GetReceiptById(selectedReceiptId)
        .then((receipt) => {
          setEditReceipt(receipt.data);
          setLoading(false);
        })
        .catch((err) => {
          showNotification.error(err.message);
          setLoading(false);
        });
    }
  }, [selectedReceiptId]);

  const [showNotification, contextHolder] = notification.useNotification();
  const { mutate: updateReceipt } = useUpdateReceipt();
  const validateFields = () => {
    if (
      editReceipt.receiptName === undefined ||
      editReceipt?.receiptName.trim().length === 0
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
        setIsOpen(undefined);
      }}
      width={600}
      open={selectedReceiptId !== undefined}
      footer={null}
    >
      <LoadingIndicator visible={loading} />
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          Tarif Güncelle
        </Row>
        <ReceiptForm receipt={editReceipt} setReceipt={setEditReceipt} />
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
              updateReceipt(editReceipt, {
                onSuccess: () => {
                  setEditReceipt({
                    receiptName: undefined,
                    receiptDetails: undefined,
                    imageId: undefined,
                    receiptItems: undefined,
                    nutritionalValuesList: undefined,
                  });
                  setIsOpen(undefined);
                  client.invalidateQueries([QUERY_KEYS.RECEIPTS.GET_ALL]);
                },
              });
            }
          }}
          type={"primary"}
        >
          Güncelle
        </Button>
      </Row>
    </Modal>
  );
};
export default EditReceiptModal;
