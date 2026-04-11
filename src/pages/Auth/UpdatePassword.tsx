/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { Form, FormInstance } from "antd";
import { AuthImages } from "../../../public/images/AllImages";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import LanguageChange from "./LanguageChange";

const UpdatePassword = () => {
  const { t } = useTranslation();
  const inputStructure = [
    {
      name: "password",
      type: "password",
      inputType: "password",
      label: t("updatePassword.new_password"),
      placeholder: "******",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [{ required: true, message: "Password is required" }],
    },
    {
      name: "confirmPassword",
      type: "password",
      inputType: "password",
      label: t("updatePassword.confirm_password"),
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
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Password does not match!"));
          },
        }),
      ],
    },
  ];
  const [resetPassword] = useResetPasswordMutation();
  const [form] = Form.useForm();
  const router = useNavigate();
  const onFinish = async (values: any) => {
    const data = {
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };

    const res = await tryCatchWrapper(
      resetPassword,
      { body: data },
      "Changing Password..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("teeru_forgetOtpMatchToken");
      router("/sign-in");
    }
  };

  return (
    <div>
      <Container>
        <LanguageChange />

        <div className="min-h-[90vh]  grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-5">
          <img
            src={AuthImages.updatePass}
            alt="logo"
            className="w-auto h-[500px] object-cover hidden lg:block"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            <div className=" mt-5 mb-8">
              <h1 className="text-3xl lg:text-4xl font-semibold text-base-color mb-5">
                {t("updatePassword.title")}
              </h1>
            </div>

            {/* -------- Form Start ------------ */}
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
                variant="gradient"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                {t("updatePassword.button")}
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
