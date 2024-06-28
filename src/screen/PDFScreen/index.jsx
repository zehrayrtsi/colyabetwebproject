import { Button, Modal, notification, Row, Upload } from "antd";
import ColyabetTable from "../../component/ColyabetTable/index.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilePdf, faReceipt } from "@fortawesome/free-solid-svg-icons";
import {
  useDeleteImage,
  useGetAllPDF,
} from "../../api/ImageController/index.js";
import { useState } from "react";
import PDFPreviewModal from "../../component/PreviewModal/PDFPreviewModal/index.jsx";
import { API, BASE_URL } from "../../constant/api.js";
import { ExclamationCircleFilled } from "@ant-design/icons";
import THEME from "../../constant/theme.js";

const PDFScreen = () => {
  const { data: pdfs, isLoading, refetch, isRefetching } = useGetAllPDF();
  const { mutate: remove, isPending } = useDeleteImage();
  const [selectedPDFId, setSelectedPDFId] = useState();
  const [showNotification, contextHolder] = notification.useNotification();
  const [modal, modalContext] = Modal.useModal();

  return (
    <div>
      {contextHolder}
      {modalContext}
      <PDFPreviewModal
        selectedPDFId={selectedPDFId}
        setSelectedPDFId={setSelectedPDFId}
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
        <div style={{ fontSize: 32, fontWeight: 600 }}>PDF</div>
        <Upload
          accept={".pdf"}
          maxCount={1}
          multiple={false}
          showUploadList={false}
          action={`${BASE_URL}${API.IMAGES.POST}`}
          onChange={async (info) => {
            if (info.file.status === "done") {
              showNotification.success({
                message: "PDF başarılı bir şekilde yüklendi !",
              });
              refetch();
            } else if (info.file.status === "error") {
              showNotification.error({
                message: "PDF yükleme başarısız oldu !",
              });
            }
          }}
        >
          <Button type={"primary"}>
            <div style={{ fontSize: 16 }}>Yeni PDF</div>
            <FontAwesomeIcon icon={faFilePdf} fontSize={20} />
          </Button>
        </Upload>
      </Row>
      <ColyabetTable
        isLoading={isLoading || isPending || isRefetching}
        showEdit={false}
        onAction={(type, row) => {
          if (type === "VIEW") {
            setSelectedPDFId(row.key);
          } else if (type === "DELETE") {
            modal.confirm({
              title: "PDF'i Silmekte Emin misiniz ?",
              content: "PDF silindikten sonra geri alınamaz !",
              okText: "Sil",
              icon: (
                <ExclamationCircleFilled style={{ color: THEME.Warning }} />
              ),
              cancelText: "Vazgeç",
              onOk: () => {
                remove(row.key, {
                  onSuccess: () => {
                    refetch();
                    showNotification.success({
                      message: "PDF başarılı bir şekilde silindi !",
                    });
                  },
                });
              },
              centered: true,
            });
          }
        }}
        data={pdfs?.data?.map((pdf) => {
          return {
            key: pdf.id,
            name: pdf.name,
            date: new Date(),
          };
        })}
        columns={[
          { title: "PDF İsmi", dataIndex: "name", key: "name", width: "70%" },
          {
            title: "Yüklenme Tarihi",
            dataIndex: "date",
            key: "date",
            render: (text, row) => {
              //TODO: TARIHLERI FORMATLA
              return `${row.date.toLocaleDateString()} - ${row.date.toLocaleTimeString()}`;
            },
          },
        ]}
        extraActions={[
          { type: "VIEW", icon: <FontAwesomeIcon icon={faEye} /> },
        ]}
      />
    </div>
  );
};

export default PDFScreen;
