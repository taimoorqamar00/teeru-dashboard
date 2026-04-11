import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminAllCategoryTable from "../../ui/Tables/AdminAllCategoryTable";
import ReuseButton from "../../ui/Button/ReuseButton";
import AdminAllCategoryModal from "../../ui/Modal/Category/AdminAddCategoryModal";
import { GoPlusCircle } from "react-icons/go";
import { ICategoryType } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/features/category/categoryAPi";
import { useTranslation } from "react-i18next";

const AdminAllCategory = () => {
  const { t } = useTranslation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetCategoryQuery({
    page,
    limit,
  });

  const allCategory: ICategoryType[] = data?.data?.result;
  const totalAllCategory = data?.data?.meta?.total;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<ICategoryType | null>(
    null
  );

  const showAddCategoryModal = () => {
    setIsAddModalVisible(true);
  };

  const showDeleteModal = (record: ICategoryType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: ICategoryType) => {
    const res = await tryCatchWrapper(
      deleteCategory,
      { params: data?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              {t("category.categories")}
            </p>
          </div>
        </div>

        <div className="mt-5 px-4">
          <ReuseButton
            variant="secondary"
            className="my-5 !text-2xl flex items-center justify-center !py-6 font-bold"
            onClick={showAddCategoryModal}
          >
            <GoPlusCircle className="" /> {t("category.add_category")}
          </ReuseButton>
          <AdminAllCategoryTable
            data={allCategory}
            loading={isFetching}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={totalAllCategory}
            limit={limit}
          />
          <AdminAllCategoryModal
            isAddModalVisible={isAddModalVisible}
            handleCancel={handleCancel}
          />
          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as ICategoryType)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllCategory;
