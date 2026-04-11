/* eslint-disable @typescript-eslint/no-explicit-any */

import ReuseButton from "../../../ui/Button/ReuseButton";
import { Form, FormInstance } from "antd";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseInput from "../../../ui/Form/ReuseInput";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { clearAuth } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();

  const inputStructure = [
    {
      name: "currentPassword",
      type: "password",
      inputType: "password",
      label: t("change_password.current_password"),
      placeholder: "******",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [{ required: true, message: "Current password is required" }],
      showPasswordToggle: true,
    },
    {
      name: "newPassword",
      type: "password",
      inputType: "password",
      label: t("change_password.new_password"),
      placeholder: "******",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [{ required: true, message: "New password is required" }],
      showPasswordToggle: true,
    },
    {
      name: "confirmNewPassword",
      type: "password",
      inputType: "password",
      label: t("change_password.confirm_new_password"),
      placeholder: "******",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [
        { required: true, message: "Confirm Password is required" },
        ({
          getFieldValue,
        }: {
          getFieldValue: FormInstance["getFieldValue"];
        }) => ({
          validator(_: unknown, value: string) {
            if (!value || getFieldValue("newPassword") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Password does not match!"));
          },
        }),
      ],
      showPasswordToggle: true,
    },
  ];

  const [form] = Form.useForm();
  const [updatePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.confirmNewPassword,
    };

    const res = await tryCatchWrapper(
      updatePassword,
      { body: data },
      "Changing Password..."
    );
    if (res.statusCode === 200) {
      dispatch(clearAuth());
      Cookies.remove("teeru_accessToken");

      window.location.href = "/sign-in";
      window.location.reload();
    }
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <p className="text-2xl text-primary-color font-semibold">
            {t("sidebar.change-password")}
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full">
          <ReusableForm form={form} handleFinish={onFinish}>
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
              />
            ))}
            <ReuseButton
              htmlType="submit"
              variant="secondary"
              className="w-full mt-4"
            >
              {t("sidebar.change-password")}
            </ReuseButton>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
