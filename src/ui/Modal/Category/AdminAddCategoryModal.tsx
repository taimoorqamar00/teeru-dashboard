/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import { FiUpload } from "react-icons/fi";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddCategoryMutation } from "../../../redux/features/category/categoryAPi";

interface AdminAllCategoryModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AdminAllCategoryModal: React.FC<AdminAllCategoryModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [addCategory] = useAddCategoryMutation();
  const [form] = Form.useForm();

  const handleAddCategory = async (values: any) => {
    const formData = new FormData();
    const file = values.image[0]?.originFileObj;

    if (file) {
      formData.append("image", file);
    }

    formData.append("name", values.name);

    const res = await tryCatchWrapper(
      addCategory,
      { body: formData },
      "Adding New Category..."
    );
    if (res.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      footer={null}
      open={isAddModalVisible}
      onCancel={handleCancel}
      centered
    >
      <div className="p-5">
        <ReusableForm form={form} handleFinish={handleAddCategory}>
          <ReuseInput
            label="Category Name"
            inputType="normal"
            name="name"
            type="text"
            placeholder="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          />

          <ReuseUpload
            label="Category Image"
            name="image"
            maxCount={1}
            rules={[{ required: true, message: "Please upload an image" }]}
            accept="image/*"
            formItemClassName="!w-full !h-full p-5"
          >
            <div className="cursor-pointer !h-full !text-base flex flex-col gap-2 items-center justify-center border-2 border-[#0C0C0C99] border-dashed rounded-xl p-5 w-[250px] sm:w-[430px]">
              <FiUpload className="text-3xl" /> Upload your category image
            </div>
          </ReuseUpload>
          <ReuseButton variant="secondary" htmlType="submit" className="mt-8">
            Add{" "}
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AdminAllCategoryModal;
