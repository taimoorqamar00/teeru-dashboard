import { useState } from "react";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import RecentNotification from "../../Components/Dashboard/Overview/RecentNotification";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import { useGetUserRatioQuery } from "../../redux/features/dashboard/dashboardApi";

const AdminDashboard = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, isFetching } = useGetUserRatioQuery({
    year: year,
  });
  const totalUser = data?.data?.totalUsers || 0;
  const totalEarning = data?.data?.totalEarnings || 0;
  const monthlyOverview = data?.data?.monthlyOverview;
  return (
    <div>
      <>
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-5">
          <div className="lg:col-span-4">
            <OverviewCard totalUser={totalUser} totalEarning={totalEarning} />
            <UserOverview
              monthlyOverview={monthlyOverview}
              currentYear={currentYear}
              setYear={setYear}
              isFetching={isFetching}
            />
          </div>
          <div className="lg:col-span-2">
            <RecentNotification />
          </div>
        </div>
        <div>
          <RecentUser />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
