import React from "react";
import { Modal, Form, message } from "antd";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import ReuseButton from "../../Button/ReuseButton";
import { useCreateStaffMutation } from "../../../redux/features/users/usersApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useTranslation } from "react-i18next";

interface AdminCreateStaffProps {
  isVisible: boolean;
  handleCancel: () => void;
}

const AdminCreateStaff: React.FC<AdminCreateStaffProps> = ({
  isVisible,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [createStaff, { isLoading }] = useCreateStaffMutation();

  const handleFinish = async (values: any) => {
    const payload = {
      fullName: values.fullName,
      gender: values.gender,
      phone: values.phone,
      email: values.email,
      password: values.password,
      role: "staff",
    };
      console.debug("createStaff payload:", payload);
      const res = await tryCatchWrapper(createStaff, { body: payload }, "Creating...");
      console.debug("createStaff result:", res);
      if (res) {
        form.resetFields();
        handleCancel();
      }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
          {t("staff.add_staff") || "Add Staff"}
        </h3>
        <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-5">
          <ReuseInput
            label={t("user_table.full_name")}
            name="fullName"
            placeholder={t("user_table.full_name")}
            rules={[{ required: true, message: t("staff.full_name_required") || "Full name is required" }]}
          />
          <ReuseSelect
            label={t("user_table.gender")}
            name="gender"
            placeholder={t("staff.select_gender")}
            options={[
              { value: "male", label: t("staff.male") },
              { value: "female", label: t("staff.female") },
              { value: "other", label: t("staff.other") },
            ]}
          />
          <ReuseInput
            label={t("user_table.phone")}
            name="phone"
            placeholder={t("user_table.phone")}
            rules={[{ required: true, message: t("staff.phone_required") || "Phone is required" }]}
          />
          <ReuseInput
            label={t("user_table.email")}
            name="email"
            placeholder={t("user_table.email")}
            rules={[
              { required: true, message: t("staff.email_required") || "Email is required" },
              { type: "email", message: t("staff.email_invalid") || "Enter a valid email" },
            ]}
          />
          <ReuseInput
            label={t("updatePassword.new_password") || "Password"}
            name="password"
            placeholder={t("updatePassword.new_password") || "Password"}
            inputType="password"
            rules={[
              { required: true, message: t("staff.password_required") || "Password is required" },
              { min: 8, message: t("staff.password_min") || "Minimum 8 characters" },
            ]}
          />
          <div className="mt-4 flex gap-3 justify-center">
            <ReuseButton variant="highlight" onClick={handleCancel}>
              {t("extra.cancel")}
            </ReuseButton>
            <ReuseButton htmlType="submit" variant="secondary" disabled={isLoading}>
              {t("staff.add_staff") || "Add Staff"}
            </ReuseButton>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AdminCreateStaff;
