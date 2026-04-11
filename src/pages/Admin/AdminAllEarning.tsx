import { useState } from "react";
import { useGetAllEarningQuery } from "../../redux/features/earning/earningApi";
import { IEarning } from "../../types";
import AdminAllEarningTable from "../../ui/Tables/AdminAllEarningTable";
import AdminViewEarningModal from "../../ui/Modal/Earning/AdminViewEarningModasl";
import { useTranslation } from "react-i18next";

const AdminAllEarning = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetAllEarningQuery({
    page,
    limit,
  });

  const allReview: IEarning[] = data?.data?.payments;
  const totalAllReview = data?.data?.pagination?.totalResults;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<IEarning | null>(null);

  const showViewUserModal = (record: IEarning) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
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
              {t("sidebar.earning")}
            </p>
          </div>
        </div>
        <div className="mt-5 px-4">
          <AdminAllEarningTable
            data={allReview}
            loading={isFetching}
            showViewModal={showViewUserModal}
            setPage={setPage}
            page={page}
            total={totalAllReview}
            limit={limit}
          />
          <AdminViewEarningModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllEarning;
