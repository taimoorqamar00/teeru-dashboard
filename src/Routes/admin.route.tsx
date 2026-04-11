//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import usersLogo from "/images/dashboard-logo/users.svg";
import categoryLogo from "/images/dashboard-logo/category.svg";
import eventsLogo from "/images/dashboard-logo/events.svg";
import reviewLogo from "/images/dashboard-logo/review.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllUsers from "../pages/Admin/AdminAllUsers";
import AdminAllReview from "../pages/Admin/AdminAllReview";
import AdminAllCategory from "../pages/Admin/AdminAllCategory";
import AdminAllEvent from "../pages/Admin/AdminAllEvent";
import AdminAllEarning from "../pages/Admin/AdminAllEarning";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Overview",
    icon: dashboardLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
  {
    path: "users",
    element: <AdminAllUsers />,
    key: "users",
    name: "Users",
    icon: usersLogo,
  },

  {
    path: "category",
    element: <AdminAllCategory />,
    key: "category",
    name: "Category",
    icon: categoryLogo,
  },
  {
    path: "event",
    element: <AdminAllEvent />,
    key: "event",
    name: "Event",
    icon: eventsLogo,
  },
  {
    path: "review",
    element: <AdminAllReview />,
    key: "review",
    name: "Review",
    icon: reviewLogo,
  },
  {
    path: "earning",
    element: <AdminAllEarning />,
    key: "earning",
    name: "Earning",
    icon: earningLogo,
  },
];
