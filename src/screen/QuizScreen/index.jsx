import { Button, Modal, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileLines } from "@fortawesome/free-solid-svg-icons";
import ColyabetTable from "../../component/ColyabetTable/index.jsx";
import {
  useDeleteQuiz,
  useGetAllQuiz,
} from "../../api/QuizController/index.js";
import { useState } from "react";
import CreateQuizModal from "../../component/CreateModal/CreateQuizModal/index.jsx";
import EditQuizModal from "../../component/EditModal/EditQuizModal/index.jsx";
import { ExclamationCircleFilled } from "@ant-design/icons";
import THEME from "../../constant/theme.js";
import QuizPreviewModal from "../../component/PreviewModal/QuizPreviewModal/index.jsx";

const QuizScreen = () => {
  const { data: quizs, isLoading, refetch, isRefetching } = useGetAllQuiz();
  const { mutate: remove, isPending } = useDeleteQuiz();
  const [openNewQuiz, setOpenNewQuiz] = useState(false);
  const [editQuizId, setEditQuizId] = useState(undefined);
  const [previewQuizId, setPreviewQuizId] = useState(undefined);
  const [modal, contextHolder] = Modal.useModal();

  return (
    <div>
      {contextHolder}
      <CreateQuizModal isOpen={openNewQuiz} setIsOpen={setOpenNewQuiz} />
      <EditQuizModal selectedQuizId={editQuizId} setIsOpen={setEditQuizId} />
      <QuizPreviewModal
        selectedQuizId={previewQuizId}
        setIsOpen={setPreviewQuizId}
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
        <div style={{ fontSize: 32, fontWeight: 600 }}>Quizler</div>
        <Button
          onClick={() => {
            setOpenNewQuiz(true);
          }}
          type={"primary"}
        >
          <div style={{ fontSize: 16 }}>Yeni Quiz</div>
          <FontAwesomeIcon icon={faFileLines} fontSize={20} />
        </Button>
      </Row>
      {/*  TODO: Sorulari Tree Table mantiginda gosterebilirim | soru | cevaplar | dogru cevap | seklinde*/}

      <ColyabetTable
        isLoading={isLoading || isRefetching || isPending}
        onAction={(type, row) => {
          switch (type) {
            case "VIEW":
              setPreviewQuizId(row.key);
              break;
            case "EDIT":
              setEditQuizId(row.key);
              break;
            case "DELETE":
              modal.confirm({
                title: "Quiz'i Silmekte Emin misiniz ?",
                content: "Quiz silindikten sonra geri alınamaz !",
                okText: "Sil",
                cancelText: "Vazgeç",
                icon: (
                  <ExclamationCircleFilled style={{ color: THEME.Warning }} />
                ),
                onOk: () => {
                  remove(row.key, {
                    onSuccess: () => {
                      refetch();
                      showNotification.success({
                        message: "Quiz başarılı bir şekilde silindi !",
                      });
                    },
                  });
                },
                centered: true,
              });
              break;
          }
        }}
        data={quizs?.data?.map((quiz) => {
          return {
            key: quiz.id,
            name: quiz.topicName,
            count: quiz.questionList.length,
            date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
            // children: quiz.questionList.map((question) => {
            //   return { key: `question-${question.id}`, name: question.name };
            // }),
          };
        })}
        columns={[
          { title: "İsim", dataIndex: "name", key: "name" },
          { title: "Soru Sayisi", dataIndex: "count", key: "count" },
          { title: "Olusturulma Tarihi", dataIndex: "date", key: "date" },
        ]}
        extraActions={[
          {
            type: "VIEW",
            icon: <FontAwesomeIcon icon={faEye} />,
          },
        ]}
      />
    </div>
  );
};

export default QuizScreen;
