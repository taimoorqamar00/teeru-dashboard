import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { formetDateAndTime } from "../../utils/dateFormet";
import { getImageUrl } from "../../helpers/config/envConfig";
import { CgUnblock } from "react-icons/cg";
import { IUserType } from "../../types";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

interface AdminAllUsersTableProps {
  data: IUserType[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: IUserType) => void;
  showBlockModal: (record: IUserType) => void;
  showUnblockModal: (record: IUserType) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminAllUsersTable: React.FC<AdminAllUsersTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  page,
  total,
  limit,
}) => {
  const { t } = useTranslation();
  const imageApiUrl = getImageUrl();
  const columns: ColumnsType<IUserType> = [
    {
      title: "#SI",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: t("user_table.full_name"), // Using translation key
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record: IUserType) => (
        <div className="flex items-center gap-2">
          <img
            src={imageApiUrl + record?.profileImage}
            alt="User"
            className="w-10 h-10 object-cover rounded"
          />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: t("user_table.phone"), // Using translation key
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("user_table.email"), // Using translation key
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("user_table.gender"), // Using translation key
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: t("user_table.role"), // Using translation key
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        return role === "admin" ? (
          <span className="text-secondary-color font-semibold">Admin</span>
        ) : (
          <span className="text-base-color font-semibold">User</span>
        );
      },
      width: 150,
      align: "center",
    },
    {
      title: t("user_table.joining_date"), // Using translation key
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formetDateAndTime(date),
    },
    {
      title: t("user_table.action"), // Using translation key
      key: "action",
      render: (_: unknown, record: IUserType) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
            <Space>
              {/* Block User Tooltip */}
              {record?.isBlocked ? (
                <Tooltip placement="right" title="Unblock User">
                  <button
                    className="!p-0 !bg-transparent !border-none !text-success-color cursor-pointer"
                    onClick={() => showUnblockModal(record)}
                  >
                    <CgUnblock style={{ fontSize: "24px" }} />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip placement="right" title="Block User">
                  <button
                    className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                    onClick={() => showBlockModal(record)}
                  >
                    <MdBlock style={{ fontSize: "24px" }} />
                  </button>
                </Tooltip>
              )}
            </Space>
          </Space>
        </>
      ),

      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"_id"}
    />
  );
};

export default AdminAllUsersTable;
