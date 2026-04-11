import { useTranslation } from "react-i18next";
import { useGetAllUsersQuery } from "../../../redux/features/users/usersApi";
import { IUserType } from "../../../types";
import RecentUsersTable from "../../../ui/Tables/RecentUsersTable";

const RecentUser = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetAllUsersQuery({
    page: 1,
    limit: 6,
    searchTerm: "",
  });

  const allUsers: IUserType[] = data?.data;

  return (
    <div className="mt-10 ">
      <div className="flex justify-between items-center py-2">
        <p className="text-2xl text-base-color lg:text-3xl font-bold mb-3">
          {t("dashboard.recent_all_users")}
        </p>
      </div>

      <div
        className=" rounded-xl "
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <RecentUsersTable data={allUsers} loading={isFetching} />
      </div>
    </div>
  );
};

export default RecentUser;
