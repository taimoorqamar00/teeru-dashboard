"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AuthImages } from "../../../public/images/AllImages";
import { useForgetOtpVerifyMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import LanguageChange from "./LanguageChange";

const OTPVerify = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [otpMatch] = useForgetOtpVerifyMutation();
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = async () => {
    const res = await tryCatchWrapper(
      otpMatch,
      { body: { otp: otp } },
      "Verifying..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("teeru_forgetToken");
      Cookies.set("teeru_forgetOtpMatchToken", res.data.forgetOtpMatchToken, {
        path: "/",
        expires: 1,
      });

      router("/update-password");
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <LanguageChange />

        <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-5">
          <img
            src={AuthImages.otp}
            alt="logo"
            className="w-auto h-[500px] object-cover hidden lg:block"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            <div className=" mt-5 mb-8">
              <h1 className="text-3xl lg:text-4xl font-semibold text-base-color mb-5">
                {t("verifyOTP.title")}
              </h1>
              <p className="text-xl lg:text-2xl font-medium mb-2 text-base-color/90">
                {t("verifyOTP.info")}
              </p>
            </div>

            <Form
              form={form}
              onFinish={handleOTPSubmit}
              layout="vertical"
              className="bg-transparent w-full"
            >
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[35px] !h-[40px] sm:!w-[60px] sm:!h-[70px] text-[20px] sm:text-[30px] !bg-primary-color border !border-base-color/30
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                variant="gradient"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                {t("verifyOTP.button")}
              </ReuseButton>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
