import { useTranslation } from "react-i18next";
import YearOption from "../../../utils/YearOption";
import Admin_Line_Chart from "../../Chart/LineChart";

export interface IMonthlyStats {
  month: number;
  monthName: string;
  userCount: number;
  totalEarnings: number;
}

const UserOverview = ({
  monthlyOverview,
  currentYear,
  setYear,
  isFetching,
}: {
  monthlyOverview: IMonthlyStats[];
  currentYear: number;
  setYear: (year: number) => void;
  isFetching: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="w-full p-3 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-5 text-base-color mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-2xl text-base-color lg:text-3xl font-bold mb-1 mr-5">
            {t("dashboard.user_ratio")}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="bg-[#507D18] w-3 h-3 rounded-full"></div>{" "}
              <p className="text-xl font-semibold">{t("dashboard.users")}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#ACD03D] w-3 h-3 rounded-full"></div>{" "}
              <p className="text-xl font-semibold">{t("dashboard.earning")}</p>
            </div>
          </div>
        </div>

        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <div>
        <Admin_Line_Chart
          isFetching={isFetching}
          monthlyOverview={monthlyOverview}
        />
      </div>
    </div>
  );
};

export default UserOverview;
