/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarsOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, Select } from "antd";
import { Link } from "react-router-dom";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import Cookies from "js-cookie";
import { decodedToken } from "../../utils/jwt";
import { IJwtPayload } from "../../types";
import { useGetNotificationQuery } from "../../redux/features/dashboard/dashboardApi";
import { formetDateAndTime } from "../../utils/dateFormet";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface TopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const languages = [
  { id: "en", name: "English", flag: AllImages.english },
  { id: "fr", name: "French", flag: AllImages.france },
];

const Topbar: React.FC<TopbarProps> = ({ collapsed, setCollapsed }) => {
  const selectedLanguage = Cookies.get("teeru_lang");
  const imageAPiUrl = getImageUrl();
  const token = Cookies.get("teeru_accessToken");
  const user = decodedToken(token || "") as IJwtPayload;
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const setLanguage = (lang: string) => {
    console.log(lang);
    i18n.changeLanguage(lang);
    Cookies.set("teeru_lang", lang, { path: "/", expires: 365, secure: false });
  };

  const { data, isFetching } = useGetNotificationQuery(
    { page: 1, limit: 5 },
    {
      skip: !open,
      refetchOnMountOrArgChange: open,
    }
  );

  const notifications = data?.data?.result;
  const { data: profile, isFetching: profileFetching } = useGetProfileQuery({});

  const profileData = profile?.data;

  if (!selectedLanguage) {
    Cookies.set("teeru_lang", "fr", { path: "/", expires: 365, secure: false });
  }

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      {isFetching ? (
        <div className="flex items-center justify-center w-40 h-60">
          <FadeLoader color="#507D18" />
        </div>
      ) : (
        notifications?.map((notification: any) => (
          <div className="test-start" key={notification._id}>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#F3F8E2] rounded-full w-fit h-fit">
                <img src={AllIcons.bell} className="w-5 h-5" alt="" />
              </div>
              <div className="flex flex-col items-start">
                <p>{notification.message}</p>
                <p className="text-gray-400">
                  {formetDateAndTime(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
      >
        {t("topbar.see_more")}
      </Link>
    </div>
  );

  return (
    <div className="flex justify-between gap-0 items-center mt-1.5">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorTextQuaternary: "#507d18",
                colorBgContainer: "rgba(0,0,0,0)",
                fontSize: 18,
                optionSelectedColor: "#ffffff",
                optionSelectedBg: "#507d18",
                optionActiveBg: "#507d1855",
                colorBorder: "#507d1800",
                colorBgElevated: "#ffffff",
                selectorBg: "#ffffff",
                colorText: "#111111",
                colorTextPlaceholder: "#111111",
                activeOutlineColor: "#D3EBE700",
                activeBorderColor: "#D3EBE700",
                hoverBorderColor: "#D3EBE700",
                colorIcon: "#507d18",
              },
            },
          }}
        >
          <Select
            className="!ring-0 !border-0 !outline-none !shadow-none"
            onChange={(value) => {
              setLanguage(value);
            }}
            defaultValue={selectedLanguage}
          >
            {languages.map(({ id, name, flag }) => (
              <Option
                className="!m-0 !mb-1 flex !justify-center !text-center !items-center "
                key={id}
                value={id}
              >
                <div className="flex items-center gap-2 !text-sm !font-semibold">
                  <img src={flag} alt={name} className="w-auto h-4" />
                  <span>{name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </ConfigProvider>
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <div className=" p-1 bg-[#F3F8E2] rounded-full w-fit">
            <img src={AllIcons.bell} className="w-6 h-6" alt="" />
          </div>
        </Dropdown>
        {profileFetching ? (
          <SpinnerLoader />
        ) : (
          <Link to="profile">
            <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1 ">
              <img
                src={
                  imageAPiUrl + profileData?.profileImage || AllImages.profile
                }
                alt="profile_pic"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                className="rounded-full border border-secondary-color"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base-color font-semibold text-sm">
                  {profileData?.fullName || ""}
                </p>
                <p className="text-base-color text-xs">{profileData?.role}</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
