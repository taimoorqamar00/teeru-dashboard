import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { IUserType } from "../../../types";
import { useTranslation } from "react-i18next";
import ReuseButton from "../../Button/ReuseButton";
interface AdminViewUsersModalProps {
  isUserViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUserType | null;
  showVerifyModal: () => void;
}
const AdminViewUsersModal: React.FC<AdminViewUsersModalProps> = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
  showVerifyModal,
}) => {
  const { t } = useTranslation();
  const imageApiUrl = getImageUrl();
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            {t("user_details.user_details")}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            {t("user_details.see_all_details")} {currentRecord?.fullName}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={imageApiUrl + currentRecord?.profileImage}
              alt={currentRecord?.fullName}
              className="w-16 h-16 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.fullName}
            </h2>
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {t("user_details.personal_information")}
            </h2>
            <div className="text-lg  mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("user_details.full_name")}:{" "}
                </span>
                <span className="">{currentRecord?.fullName}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">{t("user_details.email")}:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium ">{t("user_details.phone")}:</span>
                <span>{currentRecord?.phone}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">{t("user_details.gender")}:</span>
                <span>{currentRecord?.gender}</span>
              </div>
            </div>
          </div>
        </div>
        <ReuseButton
          variant={currentRecord?.role === "admin" ? "error" : "secondary"}
          htmlType="button"
          className="w-full mt-5"
          onClick={showVerifyModal}
        >
          {currentRecord?.role === "admin"
            ? t("user_details.remove_admin")
            : t("user_details.make_admin")}
        </ReuseButton>
      </div>
    </Modal>
  );
};

export default AdminViewUsersModal;
