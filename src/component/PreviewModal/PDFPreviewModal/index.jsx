import { Button, Modal, Row } from "antd";
import { API, BASE_URL } from "../../../constant/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const PDFPreviewModal = ({ selectedPDFId, setSelectedPDFId }) => {
  return (
    <Modal
      closable={false}
      footer={null}
      open={selectedPDFId !== undefined}
      onCancel={() => {
        setSelectedPDFId(undefined);
      }}
      width={"80%"}
    >
      <Row style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>PDF</div>
        <Button
          type="primary"
          shape={"circle"}
          icon={<FontAwesomeIcon icon={faX} />}
          onClick={() => {
            setSelectedPDFId(undefined);
          }}
        />
      </Row>
      <iframe
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        src={`${BASE_URL}${API.IMAGES.GET}${selectedPDFId}`}
      />
    </Modal>
  );
};
export default PDFPreviewModal;
