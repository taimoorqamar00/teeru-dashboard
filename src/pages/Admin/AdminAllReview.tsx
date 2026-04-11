import { useState } from "react";
import AdminAllReviewTable from "../../ui/Tables/AdminAllReviewTable";
import AdminViewReviewModal from "../../ui/Modal/Review/AdminViewReviewModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import {
  useDeleteReviewMutation,
  useGetReviewQuery,
} from "../../redux/features/review/reviewApi";
import { IReview } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useTranslation } from "react-i18next";

const AdminAllReview = () => {
  const { t } = useTranslation();
  const [deleteReview] = useDeleteReviewMutation();
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetReviewQuery({
    page,
    limit,
  });

  const allReview: IReview[] = data?.data?.result;
  const totalAllReview = data?.data?.meta?.total;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<IReview | null>(null);

  const showViewUserModal = (record: IReview) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: IReview) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: IReview) => {
    const res = await tryCatchWrapper(
      deleteReview,
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
              {t("sidebar.review")}
            </p>
          </div>
        </div>
        <div className="mt-5 px-4">
          <AdminAllReviewTable
            data={allReview}
            loading={isFetching}
            showViewModal={showViewUserModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={totalAllReview}
            limit={limit}
          />
          <AdminViewReviewModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as IReview)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllReview;
