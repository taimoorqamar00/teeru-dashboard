/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import ReusableForm from "../../../ui/Form/ReuseForm";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseInput from "../../../ui/Form/ReuseInput";
import ReuseButton from "../../../ui/Button/ReuseButton";
import {
  useAddPromotionMutation,
  useGetPromotionQuery,
} from "../../../redux/features/setting/settingApi";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

const AdminPromotion = () => {
  const { t } = useTranslation();

  const inputStructure = [
    {
      name: "text",
      type: "text",
      inputType: "textarea",
      rows: 10,
      label: t("promotion.inputLabel"),
      placeholder: "Enter Promotion",
      labelClassName: "!font-medium",
      inputClassName: "!py-2",
      rules: [{ required: true, message: "Promotion is required" }],
      showPasswordToggle: true,
    },
  ];

  const [form] = Form.useForm();
  const [updatePassword] = useAddPromotionMutation();
  const { data, isFetching } = useGetPromotionQuery({});

  const promotionText = data?.data?.text;

  useEffect(() => {
    if (promotionText) {
      form.setFieldsValue({ text: promotionText });
    }
  }, [form, promotionText]);

  console.log("data", data);

  const onFinish = async (values: any) => {
    await tryCatchWrapper(
      updatePassword,
      { body: values },
      "Changing Password..."
    );
  };

  if (isFetching) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FadeLoader color="#507D18" />
      </div>
    );
  }

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <p className="text-2xl text-primary-color font-semibold">
            {t("promotion.header")}
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
                rows={input.rows}
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
              {t("promotion.buttonText")}
            </ReuseButton>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default AdminPromotion;
