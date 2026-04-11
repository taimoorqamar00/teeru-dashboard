import { Modal } from "antd";
import { formetDateAndTime } from "../../../utils/dateFormet";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { IEarning } from "../../../types";
import ReuseTable from "../../../utils/ReuseTable";
import { useTranslation } from "react-i18next"; // Assuming you're using react-i18next for localization

interface AdminViewEarningModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEarning | null;
}

const AdminViewEarningModal: React.FC<AdminViewEarningModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const { t } = useTranslation(); // Access translation function
  const imageApiUrl = getImageUrl();
  const columns = [
    {
      title: t("earning_details.name"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: t("earning_details.seat"),
      dataIndex: "seat",
      key: "seat",
      align: "center",
    },
  ];
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            {t("earning_details.title")} {/* Localization for title */}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            {t("earning_details.see_full_details", {
              name: currentRecord?.user_id?.fullName,
            })}
          </p>
          <div className="flex justify-center items-center gap-1 mt-5">
            {/* Avatar */}
            <img
              src={imageApiUrl + currentRecord?.user_id?.profileImage}
              alt={currentRecord?.user_id?.fullName}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold ">
              {currentRecord?.user_id?.fullName}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.name")}:
                </span>
                <span className="text-secondary-color">
                  {currentRecord?.user_id?.fullName}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.email")}:
                </span>
                <span>{currentRecord?.user_id?.email}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.event_name")}:
                </span>
                <span>{currentRecord?.ticketId?.eventId?.name}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.amount")}:
                </span>
                <span>{currentRecord?.amount}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.transaction_id")}:
                </span>
                <span>{currentRecord?.transactionId}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.payment_method")}:
                </span>
                <span>{currentRecord?.paymentMethod}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {t("earning_details.payment_status")}:
                </span>
                <span>{currentRecord?.paymentStatus}</span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="font-medium">
                  {t("earning_details.date")}:
                </span>
                <span className="text-justify pt-0 ">
                  {formetDateAndTime(currentRecord?.createdAt)}
                </span>
              </div>

              {currentRecord?.ticketId?.tickets && (
                <ReuseTable
                  data={currentRecord.ticketId.tickets}
                  columns={columns}
                  loading={false}
                  keyValue={"name"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewEarningModal;
