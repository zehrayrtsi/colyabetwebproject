import ColyabetTable from "../../component/ColyabetTable/index.jsx";
import { Button, Col, List, Modal, Row, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useGetAllSuggestions,
  useRemoveSuggestion,
} from "../../api/SuggestionController/index.js";
import { timeElapsed } from "../../util/date.js";
import { ExclamationCircleFilled } from "@ant-design/icons";
import THEME from "../../constant/theme.js";

const SuggestsScreen = () => {
  const [viewType, setViewType] = useState("LIST");
  const {
    data: suggestions,
    isLoading,
    refetch,
    isRefetching,
  } = useGetAllSuggestions();
  const [modal, contextHolder] = Modal.useModal();

  const { mutate: remove, isPending } = useRemoveSuggestion();

  const loading = isLoading || isRefetching || isPending;

  return (
    <div>
      {contextHolder}
      <Row
        style={{
          width: "100%",
          padding: 4,
          borderRadius: 12,
          marginBottom: 8,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600 }}>Öneriler</div>
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
          isLoading={loading}
          showEdit={false}
          onAction={(type, row) => {
            if (type === "DELETE") {
              modal.confirm({
                title: "Öneriyi Silmekte Emin misiniz ?",
                content: "Öneri silindikten sonra geri alınamaz !",
                okText: "Sil",
                cancelText: "Vazgeç",
                icon: (
                  <ExclamationCircleFilled style={{ color: THEME.Warning }} />
                ),
                onOk: () => {
                  remove(row.key, {
                    onSuccess: () => {
                      refetch();
                      showNotification.error({
                        message: "Öneri başarılı bir şekilde silindi !",
                      });
                    },
                  });
                },
                centered: true,
              });
            }
            // console.log(type, row);
          }}
          data={suggestions?.data?.map((suggestion) => {
            return {
              key: suggestion.suggestionId,
              name: suggestion.userName,
              suggest: suggestion.suggestion,
            };
          })}
          columns={[
            { title: "İsim", dataIndex: "name", key: "name" },
            {
              title: "Öneri",
              dataIndex: "suggest",
              key: "suggest",
              width: "80%",
            },
          ]}
        />
      )}
      {viewType === "GRID" && (
        <List
          pagination={true}
          bordered
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          //loadMore={loadMore}
          dataSource={suggestions?.data}
          renderItem={(item) => {
            console.log(item);
            return (
              <List.Item key={item.suggestionId}>
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    title={item.userName}
                    description={item.suggestion}
                  />
                  <div style={{ marginRight: 16 }}>
                    {timeElapsed(item.createdDate) + " önce"}
                  </div>
                  <Button
                    danger
                    type={"primary"}
                    shape={"circle"}
                    icon={<FontAwesomeIcon icon={faX} />}
                    onClick={() => {}}
                  />
                </Skeleton>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default SuggestsScreen;
