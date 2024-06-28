import { Button, DatePicker, Row, Select } from "antd";
import { useGetAllUsers } from "../../api/UserController/index.js";
import { useState } from "react";
import dayjs from "dayjs";
import { useUserReports } from "../../api/MealController/index.jsx";
import ColyabetTable from "../ColyabetTable/index.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import UserReportPreview from "../PreviewModal/UserReportPreview/index.jsx";

const { RangePicker } = DatePicker;

const UserReports = () => {
  const [reportRequest, setReportRequest] = useState({
    email: undefined,
    dateRange: undefined,
  });

  const { data: users, isFetching } = useGetAllUsers();
  const {
    data: userReports,
    refetch,
    isFetching: isFethingUserReports,
  } = useUserReports(reportRequest);
  const [selectedUserReport, setSelectedUserReport] = useState(undefined);
  console.log(userReports?.data);
  console.log(reportRequest);
  return (
    <Row style={{ width: "100%" }}>
      <UserReportPreview
        report={selectedUserReport}
        setReport={setSelectedUserReport}
      />
      <Row style={{ width: "100%", gap: 16, marginBottom: 16 }}>
        <Select
          placeholder={"Kullanıcı maili seçiniz !"}
          style={{ minWidth: 250 }}
          loading={isFetching}
          options={users?.data?.map((user) => {
            return { value: user.email, label: user.email };
          })}
          onChange={(value) => {
            setReportRequest({
              ...reportRequest,
              email: value,
            });
          }}
          value={reportRequest.email}
        />
        <RangePicker
          value={
            reportRequest.dateRange
              ? [
                  dayjs(reportRequest.dateRange[0]),
                  dayjs(reportRequest.dateRange[1]),
                ]
              : []
          }
          onChange={(_, dateStrings) => {
            setReportRequest({
              ...reportRequest,
              dateRange: dateStrings,
            });
          }}
        />
        <Button
          onClick={() => {
            refetch();
          }}
          type={"primary"}
        >
          Rapor Getir
        </Button>
      </Row>
      <ColyabetTable
        onAction={(type, row, index) => {
          setSelectedUserReport(userReports?.data[index]);
        }}
        showEdit={false}
        showDelete={false}
        isLoading={isFethingUserReports}
        columns={[
          {
            key: "name",
            title: "Rapor İsmi",
            dataIndex: "name",
            width: "60%",
          },
          {
            key: "foodCount",
            title: "Yemek Sayısı",
            dataIndex: "foodCount",
          },
          {
            key: "date",
            title: "Tarih",
            dataIndex: "date",
          },
        ]}
        data={userReports?.data?.map((report, index) => {
          const date = new Date(report.dateTime);
          return {
            name: `${report.userName} ${userReports?.data?.length - index}. Rapor`,
            foodCount: report.foodResponseList?.length || 0,
            date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
          };
        })}
        extraActions={[
          {
            type: "VIEW",
            icon: <FontAwesomeIcon icon={faEye} />,
          },
        ]}
      />
    </Row>
  );
};

export default UserReports;
