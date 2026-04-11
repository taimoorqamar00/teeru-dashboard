import { MdArrowBackIos } from "react-icons/md";
import { AllIcons } from "../../../public/images/AllImages";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { FadeLoader } from "react-spinners";
import { formetDateAndTime } from "../../utils/dateFormet";
import { Pagination } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const limit = 12;
  const { data, isFetching } = useGetNotificationQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const notifications = data?.data?.result;

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <FadeLoader color="#507D18" />
      </div>
    );
  }

  return (
    <div
      className=" bg-slate-50  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">
          {t("extra.all_notifications")}
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className=" p-1 bg-[#F3F8E2] rounded-full w-fit">
              <img src={AllIcons.bell} className="w-7 h-7" alt="" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {notification.message}
              </span>
              <span className="text-sm text-gray-500">
                {" "}
                {formetDateAndTime(notification?.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="py-10 flex items-center justify-center">
        {" "}
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={data?.data?.meta?.total}
        />
      </div>
    </div>
  );
};
export default Notifications;
