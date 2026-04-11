import { useState } from "react";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllUsersTable from "../../ui/Tables/AdminAllUsersTable";
import AdminViewUsersModal from "../../ui/Modal/Users/AdminViewUsers";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import {
  useBlockUserMutation,
  useChangeRoleMutation,
  useGetAllUsersQuery,
  useUnBlockUserMutation,
} from "../../redux/features/users/usersApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { IUserType } from "../../types";
import { useTranslation } from "react-i18next";
import MakeAdminModal from "../../ui/Modal/Users/MakeAdminModal";

const AdminAllUsers = () => {
  const { t } = useTranslation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnBlockUserMutation();
  const [changeRole] = useChangeRoleMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetAllUsersQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const allUsers: IUserType[] = data?.data;
  const totalAllUsers = data?.meta?.total;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
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

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const showVerifyModal = () => {
    setIsVerifyModalVisible(true);
  };

  const handleVerifyCancel = () => {
    setIsVerifyModalVisible(false);
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

  const handleMakeAdmin = async (data: IUserType) => {
    const res = await tryCatchWrapper(
      changeRole,
      {
        body: {
          role: "admin",
        },
        params: data?._id,
      },
      "Processing..."
    );
    if (res.statusCode === 200) {
      setIsVerifyModalVisible(false);
      setTimeout(() => {
        handleCancel();
      }, 100);
    }
  };
  const handleRemoveAdmin = async (data: IUserType) => {
    const res = await tryCatchWrapper(
      changeRole,
      {
        body: {
          role: "user",
        },
        params: data?._id,
      },
      "Processing..."
    );
    if (res.statusCode === 200) {
      setIsVerifyModalVisible(false);
      setTimeout(() => {
        handleCancel();
      }, 100);
    }
  };
  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl "
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              {t("dashboard.users")}
            </p>
            <div className="h-fit">
              <SearchInput
                placeholder={t("extra.search")}
                setSearch={setSearchText}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
        <div className="p-5">
          <AdminAllUsersTable
            data={allUsers}
            loading={isFetching}
            showViewModal={showViewUserModal}
            showBlockModal={showBlockModal}
            showUnblockModal={showUnblockModal}
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
          showVerifyModal={showVerifyModal}
        />
        <BlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
        <UnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleUnblock={handleUnblock}
        />
        <MakeAdminModal
          handleRemoveAdmin={handleRemoveAdmin}
          handleMakeAdmin={handleMakeAdmin}
          isVerifyModalVisible={isVerifyModalVisible}
          handleVerifyCancel={handleVerifyCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminAllUsers;
