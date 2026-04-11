/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { formetDateAndTime } from "../../../utils/dateFormet";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { useTranslation } from "react-i18next";

interface AdminViewEventModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}

const AdminViewEventModal: React.FC<AdminViewEventModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const { t } = useTranslation();
  const imageApiUrl = getImageUrl();

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[800px]"
    >
      <div className="p-5">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold mb-1">
          {t("event_details.title", "Event Details")}
        </h2>
        <p className="text-center text-lg text-gray-500 mb-4">
          {t("event_details.subtitle", {
            name: currentRecord?.name,
          })}
        </p>

        {/* Event Image & Name */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <img
            src={imageApiUrl + currentRecord?.image}
            alt={currentRecord?.name}
            className="w-28 h-28 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold">{currentRecord?.name}</h3>
        </div>

        {/* Information Section */}
        <h4 className="font-semibold mb-2 text-2xl text-secondary-color">
          {t("event_details.information", "Information")}
        </h4>
        <div className="text-base space-y-1 mb-4">
          <p>
            <strong>{t("event_details.event_name")}:</strong>{" "}
            {currentRecord?.name}
          </p>
          <p>
            <strong>{t("event_details.category")}:</strong>{" "}
            {currentRecord?.category?.name}
          </p>
          <p>
            <strong>{t("event_details.date")}:</strong>{" "}
            {formetDateAndTime(currentRecord?.date)}
          </p>
          <p>
            <strong>{t("event_details.time")}:</strong> {currentRecord?.time}
          </p>
          <p>
            <strong>{t("event_details.location")}:</strong>{" "}
            {currentRecord?.location}
          </p>
        </div>

        {/* Ticket Prices Section */}
        <h4 className="font-semibold mb-2 text-2xl text-secondary-color">
          {t("event_details.ticket_prices", "Ticket Prices")}
        </h4>
        <div className="text-base space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {["tribune", "annexeLoge", "logeVIP", "logeVVIP"].map(
            (categoryKey) => {
              const ticket = currentRecord?.ticketPrices?.[categoryKey];
              if (!ticket) return null;

              // Use translation keys dynamically if you want:
              // t(`event_details.${categoryKey}`)
              // or you can hardcode labels if you prefer

              return (
                <div key={categoryKey} className="space-y-1">
                  <p>
                    <strong>{t(`event_form.${categoryKey}_heading`)}:</strong>
                  </p>
                  <p>
                    &nbsp;&nbsp;{t("event_form.tribune")}: €{ticket.price}
                  </p>
                  <p>
                    &nbsp;&nbsp;{t("event_form.service_fee")}: €
                    {ticket.serviceFee}
                  </p>
                  <p>
                    &nbsp;&nbsp;{t("event_form.processing_fee")}: €
                    {ticket.processingFee}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewEventModal;
