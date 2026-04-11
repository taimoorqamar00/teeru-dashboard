/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { AllIcons } from "../../../../public/images/AllImages";
import Cookies from "js-cookie";
import { decodedToken } from "../../../utils/jwt";
import { IJwtPayload } from "../../../types";
import { useGetNotificationQuery } from "../../../redux/features/dashboard/dashboardApi";
import { formetDateAndTime } from "../../../utils/dateFormet";
import { FadeLoader } from "react-spinners";

import { useTranslation } from "react-i18next";

const RecentNotification = () => {
  const { t } = useTranslation();
  const token = Cookies.get("teeru_accessToken");
  const user = decodedToken(token || "") as IJwtPayload;

  const { data, isFetching } = useGetNotificationQuery(
    { page: 1, limit: 10 },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const notifications = data?.data?.result;

  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto  rounded-xl relative"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between items-center sticky top-0 p-5 bg-white z-10">
        <h1 className="text-xl font-semibold">
          {t("dashboard.recent_activity")}
        </h1>
        <Link to={`/${user?.role}/notifications`}>
          <p className="cursor-pointer text-[#898c8d] underline ">
            {t("dashboard.view_all")}
          </p>
        </Link>
      </div>
      {isFetching ? (
        <div className="flex items-center justify-center h-full">
          <FadeLoader color="#507D18" />
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-5">
          {notifications?.map((activity: any) => (
            <div key={activity?._id} className="flex items-start gap-2">
              <div className=" p-1 bg-[#F3F8E2] rounded-full w-fit">
                <img src={AllIcons.bell} className="w-5 h-5" alt="" />
              </div>
              <div>
                <p className="text-[#242424] text-base font-medium">
                  {activity?.message}
                </p>

                <p className="text-sm text-[#8A8D8E] mt-1">
                  {formetDateAndTime(activity?.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentNotification;
