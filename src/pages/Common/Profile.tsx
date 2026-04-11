/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import Cookies from "js-cookie";
import { decodedToken } from "../../utils/jwt";
import { IJwtPayload } from "../../types";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import Loading from "../../ui/Loading";
import { getImageUrl } from "../../helpers/config/envConfig";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation(); // Assuming you're using react-i18next for translation

  const inputStructure = [
    {
      name: "email",
      type: "email",
      inputType: "email",
      label: t("profile.email"),
      placeholder: t("profile.email_placeholder"),
      labelClassName: "!font-medium",
      inputClassName: "!py-2 !w-full",
      rules: [
        {
          required: true,
          message: t("profile.email") + " " + t("required_field"),
        },
      ],
    },
    {
      name: "fullName",
      type: "text",
      inputType: "text",
      label: t("profile.name"),
      placeholder: t("profile.name_placeholder"),
      labelClassName: "!font-medium",
      inputClassName: "!py-2 !w-full",
      rules: [
        {
          required: true,
          message: t("profile.name") + " " + t("required_field"),
        },
      ],
    },
    {
      name: "phone",
      type: "text",
      inputType: "tel",
      label: t("profile.phone"),
      placeholder: t("profile.phone_placeholder"),
      labelClassName: "!font-medium",
      inputClassName: "!py-2 !w-full",
      rules: [
        {
          required: true,
          message: t("profile.phone") + " " + t("required_field"),
        },
      ],
    },
  ];

  const imageApiUrl = getImageUrl();
  const token = Cookies.get("teeru_accessToken");
  const user = decodedToken(token || "") as IJwtPayload;

  const { data, isFetching } = useGetProfileQuery({});

  const profileData = data?.data;

  const onSubmit = (values: any) => {
    console.log(values);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-3xl text-primary-color font-semibold w-[95%] mx-auto">
          {t("sidebar.profile")}
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className=" text-base-color rounded-lg h-full w-full lg:w-[70%]">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                className="h-36 w-36 rounded-full border-2 border-secondary-color relative"
                src={imageApiUrl + profileData?.profileImage}
                alt=""
              />
              <p className="text-4xl font-semibold">{profileData?.fullName}</p>
            </div>
            <div className="w-full flex justify-end mt-5">
              <ReuseButton
                className="!px-4"
                variant="secondary"
                htmlType="button"
                url={`/${user?.role}/profile/edit-profile`}
              >
                <div className="flex gap-3">
                  <EditOutlined
                    className="text-lg"
                    style={{ color: "#FAFAFA" }}
                  />
                  <p className="text-primary-color text-lg">
                    {t("profile.edit_profile")}
                  </p>
                </div>
              </ReuseButton>
            </div>
          </div>
          <div className="flex flex-col w-full items-center text-white mt-5">
            <ReusableForm
              handleFinish={onSubmit}
              className="!w-full"
              defaultValues={profileData}
            >
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                  disabled
                />
              ))}
            </ReusableForm>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
