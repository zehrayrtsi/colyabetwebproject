import { Button, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";

const ColyabetTable = ({
  data = [],
  columns = [],
  onAction = (type, row, index) => {},
  size = "small",
  extraActions = [],
  showEdit = true,
  showDelete = true,
  isLoading = false,
}) => {
  const tableColumns = [...columns];

  let actionColumnSize = 0;
  if (showEdit) actionColumnSize += 55;
  if (showDelete) actionColumnSize += 55;
  actionColumnSize = actionColumnSize += extraActions.length * 40;

  if (showEdit || showDelete || extraActions.length > 0) {
    tableColumns.push({
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: actionColumnSize,
      render: (text, record, index) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {extraActions.map((action) => {
              return (
                <Button
                  type={"primary"}
                  key={`action-${action.type}`}
                  color={action.color}
                  onClick={() => {
                    onAction(action.type, record, index);
                  }}
                  // type="primary"
                  shape="circle"
                  icon={action.icon}
                />
              );
            })}
            {showEdit && (
              <Button
                onClick={() => {
                  onAction("EDIT", record, index);
                }}
                type="primary"
                shape="circle"
                icon={<FontAwesomeIcon icon={faPen} />}
              />
            )}
            {showDelete && (
              <Button
                danger
                onClick={() => {
                  onAction("DELETE", record, index);
                }}
                type="primary"
                shape="circle"
                icon={<FontAwesomeIcon icon={faX} />}
              />
            )}
          </div>
        );
      },
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <Table
        loading={isLoading}
        bordered
        size={size}
        dataSource={data}
        columns={tableColumns}
      />
    </div>
  );
};

export default ColyabetTable;
