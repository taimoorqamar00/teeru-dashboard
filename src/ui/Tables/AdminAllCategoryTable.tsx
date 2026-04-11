import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { MdDelete } from "react-icons/md";
import { ICategoryType } from "../../types";
import { ColumnsType } from "antd/es/table";
import { getImageUrl } from "../../helpers/config/envConfig";
import { useTranslation } from "react-i18next";

interface AdminAllCategoryTableProps {
  data: ICategoryType[];
  loading: boolean;
  showDeleteModal: (record: ICategoryType) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllCategoryTable as a functional component
const AdminAllCategoryTable: React.FC<AdminAllCategoryTableProps> = ({
  data,
  loading,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const { t } = useTranslation();
  const imageApiUrl = getImageUrl();
  const columns: ColumnsType<ICategoryType> = [
    {
      title: "#SI",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: t("category_table.category_name"),
      dataIndex: "name", // Data key for name
      key: "name",
    },
    {
      title: t("category_table.category_image"),
      dataIndex: "image", // Data key for image
      key: "image",
      render: (image: string) => (
        <img
          src={imageApiUrl + image}
          alt="Category"
          className="w-auto h-20 object-cover rounded"
        />
      ),
    },
    {
      title: t("category_table.action"),
      key: "action",
      render: (_: unknown, record: ICategoryType) => (
        <Space size="middle">
          <Tooltip placement="left" title="Delete Category">
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

export default AdminAllCategoryTable;
