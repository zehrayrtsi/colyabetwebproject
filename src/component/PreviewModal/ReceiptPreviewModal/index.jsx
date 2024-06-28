import { Col, Image, Modal, notification, Row, Tabs } from "antd";
import { useEffect, useState } from "react";

import { GetReceiptById } from "../../../api/ReceiptController/index.js";
import LoadingIndicator from "../../LoadingIndicator/index.jsx";
import { API, BASE_URL } from "../../../constant/api.js";
import ColyabetTable from "../../ColyabetTable/index.jsx";
import { GetAllComments } from "../../../api/CommentController/index.jsx";

const ReceiptPreviewModal = ({ selectedReceiptId, setIsOpen }) => {
  const [previewReceipt, setPreviewReceipt] = useState({
    receiptName: undefined,
    receiptDetails: undefined,
    imageId: undefined,
    receiptItems: undefined,
    nutritionalValuesList: undefined,
  });
  const [comments, setComments] = useState([]);
  const [showNotification, contextHolder] = notification.useNotification();
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [step, setStep] = useState("0");

  useEffect(() => {
    if (selectedReceiptId) {
      setReceiptLoading(true);
      setCommentLoading(true);
      GetReceiptById(selectedReceiptId)
        .then((receipt) => {
          setPreviewReceipt(receipt.data);
          setReceiptLoading(false);
        })
        .catch((err) => {
          showNotification.error(err.message);
          setReceiptLoading(false);
        });
      GetAllComments(selectedReceiptId)
        .then((comment) => {
          setComments(comment.data);
          setCommentLoading(false);
        })
        .catch((err) => {
          showNotification.error(err.message);
          setCommentLoading(false);
        });
    }
  }, [selectedReceiptId]);
  console.log(
    comments?.map((comment, index) => {
      return {
        key: comment.commentResponse.commentId || `comment-${index}`,
        comment: comment.commentResponse.comment,
        sender: comment.commentResponse.userName,
        children:
          comment.replyResponses.length > 0
            ? comment.replyResponses.map((reply) => {
                return {
                  key: reply.replyId || `comment-${index}`,
                  comment: reply.reply,
                  sender: reply.userName,
                };
              })
            : undefined,
      };
    }),
  );
  return (
    <Modal
      onCancel={() => {
        setIsOpen(undefined);
      }}
      width={600}
      open={selectedReceiptId !== undefined}
      footer={null}
    >
      <LoadingIndicator visible={receiptLoading || commentLoading} />
      {contextHolder}
      <Row style={{ marginBottom: 8, width: "100%" }}>
        <Col
          style={{ display: "flex", justifyContent: "center", marginRight: 32 }}
        >
          <Image
            src={`${BASE_URL}${API.IMAGES.GET}${previewReceipt?.imageId}`}
            alt={previewReceipt?.name}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </Col>
        <div style={{ fontSize: 24, flex: 1, fontWeight: 600 }}>
          {previewReceipt?.receiptName}
        </div>
      </Row>
      <Tabs
        value={step}
        items={[
          {
            key: "0",
            label: "Tarif Adminlari",
          },
          {
            key: "1",
            label: "Malzemeler",
          },
          {
            key: "2",
            label: "Besin Icerikleri",
          },
          {
            key: "3",
            label: "Yorumlar",
          },
        ]}
        onChange={(key) => {
          setStep(key);
        }}
      />
      {step === "0" && (
        <ColyabetTable
          showEdit={false}
          showDelete={false}
          step={"small"}
          loading={receiptLoading}
          columns={[{ title: "Adımlar", key: "step", dataIndex: "step" }]}
          data={previewReceipt?.receiptDetails?.map((detail, index) => {
            return { step: `${index + 1}. Adım ${detail}` };
          })}
        />
      )}
      {step === "1" && (
        <ColyabetTable
          showEdit={false}
          showDelete={false}
          step={"small"}
          loading={receiptLoading}
          columns={[
            { title: "Malzemeler", key: "material", dataIndex: "material" },
          ]}
          data={previewReceipt?.receiptItems?.map((item) => {
            return {
              material: `${item.unit} ${item.type} ${item.productName}`,
            };
          })}
        />
      )}
      {step === "2" && (
        <ColyabetTable
          data={previewReceipt?.nutritionalValuesList?.map(
            (nutrition, index) => {
              return {
                key: nutrition.id || `nutrition-${index}`,
                type: nutrition.type,
                fatAmount: nutrition.fatAmount,
                carbohydrateAmount: nutrition.carbohydrateAmount,
                proteinAmount: nutrition.proteinAmount,
                calorieAmount: nutrition.calorieAmount,
              };
            },
          )}
          isLoading={receiptLoading}
          showEdit={false}
          showDelete={false}
          columns={[
            {
              key: "type",
              title: "Tip",
              dataIndex: "type",
            },
            {
              key: "fatAmount",
              title: "Yağ (g)",
              dataIndex: "fatAmount",
            },
            {
              key: "carbohydrateAmount",
              title: "Karbonhidrat (g)",
              dataIndex: "carbohydrateAmount",
            },
            {
              key: "proteinAmount",
              title: "Protein (g)",
              dataIndex: "proteinAmount",
            },
            {
              key: "calorieAmount",
              title: "Kalori (g)",
              dataIndex: "calorieAmount",
            },
          ]}
        />
      )}
      {step === "3" && (
        <ColyabetTable
          data={comments?.map((comment, index) => {
            return {
              key: comment.commentResponse.commentId || `comment-${index}`,
              comment: comment.commentResponse.comment,
              sender: comment.commentResponse.userName,
              children:
                comment.replyResponses.length > 0
                  ? comment.replyResponses.map((reply) => {
                      return {
                        key: reply.replyId || `comment-${index}`,
                        comment: reply.reply,
                        sender: reply.userName,
                      };
                    })
                  : undefined,
            };
          })}
          isLoading={receiptLoading}
          showEdit={false}
          showDelete={false}
          columns={[
            {
              key: "sender",
              title: "Kullanıcı",
              dataIndex: "sender",
              width: "50%",
            },
            {
              key: "comment",
              title: "Yorum",
              dataIndex: "comment",
              width: "50%",
            },
          ]}
        />
      )}
    </Modal>
  );
};
export default ReceiptPreviewModal;
