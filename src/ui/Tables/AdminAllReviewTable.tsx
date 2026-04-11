import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { MdDelete } from "react-icons/md";
import { formetDateAndTime } from "../../utils/dateFormet";
import { IReview } from "../../types";
import { useTranslation } from "react-i18next";

interface AdminAllReviewTableProps {
  data: IReview[];
  loading: boolean;
  showViewModal: (record: IReview) => void;
  showDeleteModal: (record: IReview) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllReviewTable as a functional component
const AdminAllReviewTable: React.FC<AdminAllReviewTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("review_table.uid"), // Using the translated title
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: t("review_table.full_name"), // Using the translated title
      dataIndex: ["userId", "fullName"],
      key: "fullName",
    },
    {
      title: t("review_table.email"), // Using the translated title
      dataIndex: ["userId", "email"],
      key: "email",
    },
    {
      title: t("review_table.date"), // Using the translated title
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formetDateAndTime(text),
    },
    {
      title: t("review_table.rating"), // Using the translated title
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div>
          <Rate allowHalf value={rating} disabled />
          <span className="ml-4">{rating}</span>
        </div>
      ),
    },
    {
      title: t("review_table.review"), // Using the translated title
      dataIndex: "comment",
      key: "comment",
      render: (text: string) => (
        <div className="max-w-[200px] truncate">
          {text?.slice(0, 20) + "..."}
        </div>
      ),
    },
    {
      title: t("review_table.action"), // Using the translated title
      key: "action",
      render: (_: unknown, record: IReview) => (
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
          <Tooltip placement="left" title="Delete Review">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
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

export default AdminAllReviewTable;
