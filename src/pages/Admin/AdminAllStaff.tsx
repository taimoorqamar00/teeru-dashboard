import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllUsersTable from "../../ui/Tables/AdminAllUsersTable";
import AdminViewUsersModal from "../../ui/Modal/Users/AdminViewUsers";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminCreateStaff from "../../ui/Modal/Users/AdminCreateStaff";
import ReuseButton from "../../ui/Button/ReuseButton";
import {
  useBlockUserMutation,
  useChangeRoleMutation,
  useGetAllUsersQuery,
  useUnBlockUserMutation,
  useDeleteUserMutation,
} from "../../redux/features/users/usersApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { IUserType } from "../../types";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const AdminAllStaff = () => {
  const { t } = useTranslation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnBlockUserMutation();
  const [changeRole] = useChangeRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching, refetch } = useGetAllUsersQuery({
    page,
    limit,
    searchTerm: searchText,
    role: "staff",
  });

  const allUsers: IUserType[] = data?.data;
  const totalAllUsers = data?.meta?.total;

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      console.debug("AdminAllStaff - fetched users roles:", allUsers.map((u) => ({ id: u._id, role: u.role })));
    } else {
      console.debug("AdminAllStaff - no users fetched or empty list", allUsers);
    }
  }, [allUsers]);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const openCreateParam = params.get("openCreate");
  const [isCreateVisible, setIsCreateVisible] = useState(openCreateParam === "1");
  const [currentRecord, setCurrentRecord] = useState<IUserType | null>(null);

  const showViewUserModal = (record: IUserType) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: IUserType) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: IUserType) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const showDeleteModal = (record: IUserType) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (record: IUserType) => {
    const res = await tryCatchWrapper(
      blockUser,
      { params: record?._id },
      "Processing..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (record: IUserType) => {
    const res = await tryCatchWrapper(
      unblockUser,
      { params: record?._id },
      "Processing..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const handleDelete = async (record: IUserType | null) => {
    if (!record) return;
    const res = await tryCatchWrapper(deleteUser, record?._id, "Deleting...");
    if (res.statusCode === 200) {
      handleCancel();
      // Ensure list refreshes after deletion
      try {
        await refetch();
      } catch (err) {
        console.error("refetch after delete failed", err);
      }
    }
  };

  return (
    <div>
      <div className=" bg-primary-color rounded-xl " style={{ boxShadow: "0px 0px 5px 1px #00000040" }}>
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              {t("sidebar.staff")}
            </p>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 pr-4">
              <SearchInput placeholder={t("extra.search")} setSearch={setSearchText} setPage={setPage} />
            </div>
            <div className="flex-none">
              <ReuseButton
                htmlType="button"
                variant="primary"
                className="!w-auto !py-2 !px-4 add-staff-btn"
                onClick={() => setIsCreateVisible(true)}
              >
                {t("staff.add_staff")}
              </ReuseButton>
            </div>
          </div>

          <AdminAllUsersTable
            data={allUsers}
            loading={isFetching}
            showViewModal={showViewUserModal}
            showBlockModal={showBlockModal}
            showUnblockModal={showUnblockModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={totalAllUsers}
            limit={limit}
          />
        </div>

        <AdminViewUsersModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          showVerifyModal={() => {}}
        />
        <BlockModal isBlockModalVisible={isBlockModalVisible} handleCancel={handleCancel} currentRecord={currentRecord} handleBlock={handleBlock} />
        <UnblockModal isUnblockModalVisible={isUnblockModalVisible} handleCancel={handleCancel} currentRecord={currentRecord} handleUnblock={handleUnblock} />

        <DeleteModal isDeleteModalVisible={isDeleteModalVisible} handleCancel={handleCancel} currentRecord={currentRecord} handleDelete={handleDelete} />

        <AdminCreateStaff isVisible={isCreateVisible} handleCancel={() => setIsCreateVisible(false)} />
      </div>
    </div>
  );
};

export default AdminAllStaff;
