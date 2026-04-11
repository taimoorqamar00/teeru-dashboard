import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { GoPlusCircle } from "react-icons/go";
import AdminAllEventTable from "../../ui/Tables/AdminAllEventTable";
import AdminAddEventModal from "../../ui/Modal/Event/AdminAddEventModa";
import AdminEditEventModal from "../../ui/Modal/Event/AdminEditEventModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { IEventType } from "../../types";
import {
  useDeleteEventMutation,
  useGetEventQuery,
} from "../../redux/features/event/eventApi";
import { useTranslation } from "react-i18next";
import AdminViewEventModal from "../../ui/Modal/Event/AdminViewEventModal";

const AdminAllEvent = () => {
  const { t } = useTranslation();
  const [deleteEvent] = useDeleteEventMutation();
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetEventQuery({
    page,
    limit,
  });

  const allEvent: IEventType[] = data?.data?.result;
  const totalAllEvent = data?.data?.meta?.total;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<IEventType | null>(null);

  const showViewModal = (record: IEventType) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showAddEventModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditEventModal = (record: IEventType) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: IEventType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: IEventType) => {
    const res = await tryCatchWrapper(
      deleteEvent,
      { params: data?._id },
      "Deleting Event..."
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
              {t("event.events")}
            </p>
          </div>
        </div>

        <div className="mt-5 px-4">
          <ReuseButton
            variant="secondary"
            className="my-5 !text-2xl flex items-center justify-center !py-6 font-bold"
            onClick={showAddEventModal}
          >
            <GoPlusCircle className="" /> {t("event.add_event")}
          </ReuseButton>
          <AdminAllEventTable
            data={allEvent}
            loading={isFetching}
            showViewModal={showViewModal}
            showEditModal={showEditEventModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={totalAllEvent}
            limit={limit}
          />
          <AdminAddEventModal
            isAddModalVisible={isAddModalVisible}
            handleCancel={handleCancel}
          />
          <AdminViewEventModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
          <AdminEditEventModal
            isEditModalVisible={isEditModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />

          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as IEventType)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllEvent;
