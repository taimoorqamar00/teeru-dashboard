/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { IEarning } from "../../types";
import { useTranslation } from "react-i18next";
interface AdminAllEarningTableProps {
  data: IEarning[];
  loading: boolean;
  showViewModal: (record: IEarning) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllEarningTable as a functional component
const AdminAllEarningTable: React.FC<AdminAllEarningTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("transaction_table.uid"),
      render: (_: any, __: any, index: number) => index + 1,
      key: "_id",
    },
    {
      title: t("transaction_table.full_name"),
      dataIndex: ["user_id", "fullName"],
      key: "fullName",
    },
    {
      title: t("transaction_table.email"),
      dataIndex: ["user_id", "email"],
      key: "email",
    },
    {
      title: t("transaction_table.event_name"),
      dataIndex: ["ticketId", "eventId", "name"],
      key: "eventName",
    },
    {
      title: t("transaction_table.amount"),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: t("transaction_table.transaction_id"),
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: t("transaction_table.payment_status"),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) =>
        text === "completed" ? (
          <span className="text-green-500">{t("completed")}</span>
        ) : (
          t("pending")
        ),
    },
    {
      title: t("transaction_table.action"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title={t("view_details")}>
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
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
      keyValue={"email"}
    />
  );
};

export default AdminAllEarningTable;
