import { Form, Modal } from "antd";
import { IoAlert } from "react-icons/io5";
import ReuseInput from "../../Form/ReuseInput";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import { useState } from "react";
import { IUserType } from "../../../types";
import { useTranslation } from "react-i18next";

interface MakeAdminModalProps {
  isVerifyModalVisible: boolean;
  handleVerifyCancel: () => void;
  currentRecord: IUserType | null;
  handleMakeAdmin: (value: IUserType) => void;
  handleRemoveAdmin: (value: IUserType) => void;
}

const MakeAdminModal: React.FC<MakeAdminModalProps> = ({
  isVerifyModalVisible,
  handleVerifyCancel,
  currentRecord,
  handleMakeAdmin,
  handleRemoveAdmin,
}) => {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation(); // Hook for translation

  const verifyTypeName =
    (currentRecord?.role === "admin" ? "remove_" : "confirm_") +
    (currentRecord?.fullName
      ? currentRecord.fullName.toLowerCase().split(" ").join("_")
      : "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCancel = () => {
    setInputValue("");
    form.resetFields();
    handleVerifyCancel();
  };

  const isButtonDisabled = inputValue !== verifyTypeName;

  const handleAdmin = (data: IUserType) => {
    if (currentRecord?.role === "admin") {
      handleRemoveAdmin(data);
    } else {
      handleMakeAdmin(data);
    }
    handleCancel();
  };

  return (
    <Modal
      open={isVerifyModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[550px]"
    >
      <div className="pt-5 text-base-color">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-1 bg-error-color rounded-full">
            <IoAlert className="text-base-color text-lg" />
          </div>
          <h2 className="text-xl font-semibold">
            {t("user_details.title")}{" "}
            {currentRecord?.role === "admin"
              ? t("remove_text")
              : t("make_text")}
          </h2>
        </div>

        <ReusableForm form={form} handleFinish={() => {}}>
          <div className="mb-2 text-base-color text-base font-medium select-none">
            {t("user_details.type")}"
            <span className="text-secondary-color font-bold">
              {verifyTypeName}
            </span>
            {` ${t("user_details.to_confirm")}`}
          </div>
          <ReuseInput
            placeholder="Type Here"
            name="verify"
            labelClassName="!font-bold select-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          {!isButtonDisabled && (
            <ReuseButton
              variant="ghost"
              className="w-full"
              htmlType="submit"
              onClick={() => {
                handleAdmin(currentRecord as IUserType);
              }}
              disabled={isButtonDisabled}
            >
              {t("user_details.confirm")}
            </ReuseButton>
          )}
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default MakeAdminModal;
