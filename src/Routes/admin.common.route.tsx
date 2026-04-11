import EditProfile from "../pages/Common/EditProfile";
import Profile from "../pages/Common/Profile";
import AdminPromotion from "../pages/Common/settings/AdminPromotion";
import ChangePassword from "../pages/Common/settings/ChangePassword";
import ContactUs from "../pages/Common/settings/ContactUs";
import profileLogo from "/images/dashboard-logo/profile.svg";
import settingLogo from "/images/dashboard-logo/setting.svg";

export const adminCommonPaths = [
  {
    path: "profile",
    element: <Profile />,
    key: "profile",
    name: "Profile",
    icon: profileLogo,
  },
  {
    path: "profile/edit-profile",
    element: <EditProfile />,
    key: "edit-profile",
  },
  {
    key: "setting",
    name: "Setting",
    icon: settingLogo,
    children: [
      {
        key: "promotion",
        path: "promotion",
        element: <AdminPromotion />,
        name: "promotion",
        icon: <span>&#8226;</span>,
      },
      {
        key: "change-password",
        path: "change-password",
        element: <ChangePassword />,
        name: "Change Password",
        icon: <span>&#8226;</span>,
      },
      {
        key: "contact-us",
        path: "contact-us",
        element: <ContactUs />,
        name: "Contact Us",
        icon: <span>&#8226;</span>,
      },
    ],
  },
];
