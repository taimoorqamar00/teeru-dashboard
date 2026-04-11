/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/features/profile/profileApi";
import Loading from "../../ui/Loading";
import { getImageUrl } from "../../helpers/config/envConfig";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
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
      disable: true, // This field will be disabled
    },
    {
      name: "fullName",
      type: "text",
      inputType: "text",
      label: t("profile.name"),
      placeholder: t("profile.name_placeholder"),
      inputClassName: "!py-2 !w-full",
      rules: [
        {
          required: true,
          message: t("profile.name") + " " + t("required_field"),
        },
      ],
      disable: false, // This field will be enabled
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
      disable: false, // This field will be enabled
    },
  ];
  const [form] = Form.useForm();
  const imageApiUrl = getImageUrl();
  const { data, isFetching } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation({});

  const profileData = data?.data;

  const profileImage = imageApiUrl + profileData?.profileImage;

  const [imageUrl, setImageUrl] = useState(profileImage);

  useEffect(() => {
    setImageUrl(profileImage);
  }, [profileImage]);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("profileImage", values?.image?.file?.originFileObj);
    }
    const data = {
      fullName: values?.fullName,
      phone: values?.phone,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      "Updating Profile..."
    );
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
      <div className="bg-secondary-color w-full p-5  rounded-tl-xl rounded-tr-xl">
        <div className=" mx-auto  flex items-center ">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer text-primary-color font-semibold mr-2"
            onClick={() => window.history.back()}
          />
          <p className="text-3xl text-primary-color font-semibold">
            {t("profile.edit_profile")}
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="py-10 w-full lg:w-[70%]"
          defaultValues={profileData}
        >
          <div className="mt-5 flex flex-col justify-center mb-8 gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className=" text-start"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  listType="picture"
                >
                  <button
                    type="button"
                    style={{
                      zIndex: 1,
                    }}
                    className="bg-secondary-color p-2 w-fit h-fit shadow !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer"
                  >
                    <IoCameraOutline className="w-6 h-6 text-primary-color" />
                  </button>
                </Upload>
              </Form.Item>
            </div>
            <p className="text-5xl font-semibold -mt-5">
              {profileData?.fullName}
            </p>
          </div>

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
              disabled={input.disable}
            />
          ))}

          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="w-full mt-4"
          >
            {t("profile.submit")}
          </ReuseButton>

          <div className=" text-white mt-5"></div>
        </ReusableForm>
      </div>
    </div>
  );
};
export default EditProfile;
