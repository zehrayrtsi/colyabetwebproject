import ColyabetTable from "../../component/ColyabetTable/index.jsx";
import THEME from "../../constant/theme.js";
import {
  useGetAllUsers,
  useRemoveUser,
} from "../../api/UserController/index.js";
import { Modal, Tag } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const RoleDictionary = {
  Admin: "Yetkili",
  User: "Kullanıcı",
};
const RoleColor = {
  Admin: "orange-inverse",
  User: "blue-inverse",
};

const UsersRoute = () => {
  const { data: users, isLoading, refetch, isRefetching } = useGetAllUsers();
  console.log(users?.data);
  const { mutate: remove, isPending } = useRemoveUser();
  const [modal, contextHolder] = Modal.useModal();

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <div
        style={{
          width: "100%",
          fontSize: 32,
          fontWeight: 600,
          padding: 4,
          borderRadius: 12,
          marginBottom: 8,
        }}
      >
        Kullanıcılar
      </div>
      <ColyabetTable
        onAction={(type, row) => {
          if (type === "DELETE") {
            modal.confirm({
              title: "Kullanıcıyı Silmekte Emin misiniz ?",
              content: "Kullanıcı silindikten sonra geri alınamaz !",
              okText: "Sil",
              cancelText: "Vazgeç",
              icon: (
                <ExclamationCircleFilled style={{ color: THEME.Warning }} />
              ),
              onOk: () => {
                remove(row.email, {
                  onSuccess: () => {
                    refetch();
                  },
                });
              },
              centered: true,
            });
          }
        }}
        isLoading={isLoading || isRefetching || isPending}
        showEdit={false}
        data={users?.data?.map((user) => {
          return {
            key: user.userId,
            realName: user.userName,
            email: user.email,
            roles: user.role,
          };
        })}
        columns={[
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          { title: "Ad Soyad", dataIndex: "realName", key: "realName" },
          {
            title: "Rolleri",
            dataIndex: "roles",
            key: "roles",
            render: (text, record) => {
              return record.roles.map((role, index) => {
                return (
                  <Tag color={RoleColor[role]} key={`role-${role}-${index}`}>
                    {RoleDictionary[role]}
                  </Tag>
                );
              });
            },
          },
        ]}
      />
    </div>
  );
};

export default UsersRoute;
