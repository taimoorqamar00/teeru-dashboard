"use client";
import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUserInfo } from "../../redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import LanguageChange from "./LanguageChange";

const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const [form] = Form.useForm();

  const inputStructure = [
    {
      name: "email",
      type: "email",
      inputType: "email",
      label: t("signIn.email"),
      placeholder: ".......@gmail.com",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "password",
      type: "password",
      inputType: "password",
      label: t("signIn.password"),
      placeholder: "Enter your password",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [{ required: true, message: "Password is required" }],
    },
  ];

  const [login] = useLoginMutation();

  const onFinish = async (values) => {
    const res = await tryCatchWrapper(login, { body: values }, "Logging In...");

    if (res?.statusCode === 200 && res?.data?.user?.role === "admin") {
      const userData = {
        _id: res?.data?.user?._id,
        fullName: res?.data?.user?.fullName,
        email: res?.data?.user?.email,
      };
      dispatch(setUserInfo(userData));
      Cookies.set("teeru_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      router("/", { replace: true });
    } else if (res?.statusCode === 200 && res?.data?.user?.role !== "admin") {
      form.resetFields();
      toast.error("Access Denied", {
        duration: 2000,
      });
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <LanguageChange />
        <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center-safe gap-5">
          <img
            src={AllImages.logo}
            alt="logo"
            className="w-auto h-[400px] object-cover hidden lg:block"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-3xl lg:text-4xl font-semibold text-base-color mb-5">
                  {t("signIn.title")}
                </h1>
                <p className="text-xl lg:text-2xl font-medium mb-2 text-base-color/90">
                  {t("signIn.info")}
                </p>
              </div>
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
              <div className="flex justify-end items-center text-base mt-10 mb-5">
                <Link
                  to="/forgot-password"
                  className="!underline font-bold !text-secondary-color"
                >
                  {t("signIn.forgot_password")}
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                {t("signIn.sign_in")}
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
