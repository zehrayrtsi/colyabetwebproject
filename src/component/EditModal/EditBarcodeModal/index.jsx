import { Button, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import BarcodeForm from "../../Forms/BarcodeForm/index.jsx";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";
import {
  GetBarcodeById,
  useUpdateBarcode,
} from "../../../api/BarcodeController/index.js";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../../constant/query.js";

const EditBarcodeModal = ({ selectedBarcodeId, setIsOpen }) => {
  const client = useQueryClient();

  const [showNotification, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const { mutate: updateBarcode, isPending } = useUpdateBarcode();
  const [barcode, setBarcode] = useState({
    imageId: undefined,
    name: undefined,
    code: undefined,
    nutritionalValuesList: [],
    glutenFree: false,
  });

  const validateFields = () => {
    if (barcode.name === undefined || barcode.name?.trim().length === 0) {
      showNotification.error({
        message: "Lütfen ürün adı alanını doldurunuz !",
        placement: "bottomRight",
      });
      return false;
    }
    if (barcode.code === undefined) {
      showNotification.error({
        message: "Lütfen ürün barkod alanını doldurunuz !",
        placement: "bottomRight",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (selectedBarcodeId) {
      setLoading(true);
      GetBarcodeById(selectedBarcodeId)
        .then((barcode) => {
          setBarcode(barcode.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [selectedBarcodeId]);

  const closeModal = () => {
    setBarcode({
      name: undefined,
      code: undefined,
      nutritionalValuesList: [],
      glutenFree: false,
    });
    setIsOpen(undefined);
  };

  return (
    <Modal
      onCancel={() => {
        closeModal();
      }}
      width={600}
      open={selectedBarcodeId !== undefined}
      footer={null}
    >
      <LoadingIndicator visible={loading || isPending} />
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Row style={{ fontSize: 36, fontWeight: 600, width: "100%" }}>
          Barcode Güncelle
        </Row>
      </Row>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} />
      <Row style={{ gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
        <Button
          onClick={() => {
            closeModal();
          }}
          type={"primary"}
        >
          İptal
        </Button>
        <Button
          onClick={() => {
            if (validateFields()) {
              updateBarcode(barcode, {
                onSuccess: () => {
                  closeModal();
                  client.invalidateQueries([QUERY_KEYS.BARCODES.GET_ALL]);
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

export default EditBarcodeModal;
