/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Modal, Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseTimePicker from "../../Form/ReuseTimePicker";
import { ICategoryType, IEventType } from "../../../types";
import { useGetCategoryQuery } from "../../../redux/features/category/categoryAPi";
import { FadeLoader } from "react-spinners";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateEventMutation } from "../../../redux/features/event/eventApi";
import ReuseUpload from "../../Form/ReuseUpload";
import { getImageUrl } from "../../../helpers/config/envConfig";

interface AdminEditEventModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEventType | null;
}

const AdminEditEventModal: React.FC<AdminEditEventModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const imageApiUrl = getImageUrl();
  const { t } = useTranslation();
  const [editEvent] = useUpdateEventMutation();
  const [form] = Form.useForm();
  const [date, setDate] = React.useState<string | null>(null);

  const { data, isFetching } = useGetCategoryQuery(
    { page: 1, limit: 999999 },
    { refetchOnMountOrArgChange: true, skip: !isEditModalVisible }
  );

  const allCategory: ICategoryType[] = data?.data?.result || [];

  // Update form fields when currentRecord changes
  useEffect(() => {
    if (currentRecord) {
      setDate(currentRecord.date || null);

      form.setFieldsValue({
        name: currentRecord.name,
        category: currentRecord.category?._id || null,
        date: currentRecord.date ? dayjs(currentRecord.date) : null,
        time: currentRecord.time ? dayjs(currentRecord.time, "HH:mm") : null,
        location: currentRecord.location,
        head_to_head: currentRecord.head_to_head,
        tribune: currentRecord.ticketPrices?.tribune?.price ?? "",
        "ticketPrices.tribune.serviceFee":
          currentRecord.ticketPrices?.tribune?.serviceFee ?? "",
        "ticketPrices.tribune.processingFee":
          currentRecord.ticketPrices?.tribune?.processingFee ?? "",

        annexeLoge: currentRecord.ticketPrices?.annexeLoge?.price ?? "",
        "ticketPrices.annexeLoge.serviceFee":
          currentRecord.ticketPrices?.annexeLoge?.serviceFee ?? "",
        "ticketPrices.annexeLoge.processingFee":
          currentRecord.ticketPrices?.annexeLoge?.processingFee ?? "",

        logeVIP: currentRecord.ticketPrices?.logeVIP?.price ?? "",
        "ticketPrices.logeVIP.serviceFee":
          currentRecord.ticketPrices?.logeVIP?.serviceFee ?? "",
        "ticketPrices.logeVIP.processingFee":
          currentRecord.ticketPrices?.logeVIP?.processingFee ?? "",

        logeVVIP: currentRecord.ticketPrices?.logeVVIP?.price ?? "",
        "ticketPrices.logeVVIP.serviceFee":
          currentRecord.ticketPrices?.logeVVIP?.serviceFee ?? "",
        "ticketPrices.logeVVIP.processingFee":
          currentRecord.ticketPrices?.logeVVIP?.processingFee ?? "",
      });
    } else {
      form.resetFields();
      setDate(null);
    }
  }, [currentRecord, form]);

  const handleDateChange = (_date: any, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      setDate(dateString[0] || null);
    } else {
      setDate(dateString);
    }
  };

  const handleFinish = async (values: any) => {
    const formData = new FormData();

    const dateISO = values.date ? values.date.toISOString() : null;
    const timeStr = values.time ? values.time.format("HH:mm") : null;

    // Structure ticketPrices nested as per your Add modal
    const ticketPrices = {
      tribune: {
        price: Number(values.tribune),
        serviceFee: Number(values["ticketPrices.tribune.serviceFee"]),
        processingFee: Number(values["ticketPrices.tribune.processingFee"]),
      },
      annexeLoge: {
        price: Number(values.annexeLoge),
        serviceFee: Number(values["ticketPrices.annexeLoge.serviceFee"]),
        processingFee: Number(values["ticketPrices.annexeLoge.processingFee"]),
      },
      logeVIP: {
        price: Number(values.logeVIP),
        serviceFee: Number(values["ticketPrices.logeVIP.serviceFee"]),
        processingFee: Number(values["ticketPrices.logeVIP.processingFee"]),
      },
      logeVVIP: {
        price: Number(values.logeVVIP),
        serviceFee: Number(values["ticketPrices.logeVVIP.serviceFee"]),
        processingFee: Number(values["ticketPrices.logeVVIP.processingFee"]),
      },
    };

    const payload = {
      name: values.name,
      category: values.category,
      date: dateISO,
      time: timeStr,
      location: values.location,
      head_to_head: values.head_to_head,
      ticketPrices,
    };

    if (values?.image?.[0]?.originFileObj) {
      formData.append("image", values.image[0].originFileObj);
    }

    formData.append("data", JSON.stringify(payload));

    const res = await tryCatchWrapper(
      editEvent,
      { body: formData, params: currentRecord?._id },
      "Updating Event..."
    );

    if (res.statusCode === 200) {
      form.resetFields();
      setDate(null);
      handleCancel();
    }
  };

  return (
    <Modal
      footer={null}
      open={isEditModalVisible}
      onCancel={handleCancel}
      centered
      className="lg:!w-[800px]"
      destroyOnClose
    >
      <div className="p-5">
        {isFetching ? (
          <div className="flex justify-center items-center h-[500px]">
            <FadeLoader color="#507d18" />
          </div>
        ) : (
          <ReusableForm form={form} handleFinish={handleFinish}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseInput
                label={t("event_form.event_name")}
                inputType="normal"
                name="name"
                type="text"
                placeholder={t("event_form.event_name_placeholder")}
                rules={[
                  { required: true, message: t("event_form.event_name") },
                ]}
              />
              <ReuseSelect
                label={t("event_form.category")}
                name="category"
                options={allCategory.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                rules={[{ required: true, message: t("event_form.category") }]}
                placeholder={t("event_form.category_placeholder")}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseDatePicker
                name="date"
                label={t("event_form.date")}
                placeholder={t("event_form.date_placeholder")}
                onChange={handleDateChange}
                rules={[{ required: true, message: t("event_form.date") }]}
              />
              <ReuseTimePicker
                date={date}
                name="time"
                label={t("event_form.select_time")}
                placeholder={t("event_form.select_time_placeholder")}
                rules={[
                  { required: true, message: t("event_form.select_time") },
                ]}
              />
            </div>

            <ReuseInput
              label={t("event_form.location")}
              inputType="normal"
              name="location"
              type="text"
              placeholder={t("event_form.location_placeholder")}
              rules={[{ required: true, message: t("event_form.location") }]}
            />

            <div>
              <ReuseUpload name="image" label={t("event_form.event_image")} />
              {currentRecord?.image && (
                <img
                  src={imageApiUrl + currentRecord.image}
                  alt="Event"
                  className="mt-2 max-h-20 object-contain"
                />
              )}
            </div>

            <div className="mt-5">
              <ReuseInput
                label={t("event_form.head_to_head")}
                inputType="normal"
                name="head_to_head"
                type="text"
                placeholder={t("event_form.head_to_head_placeholder")}
                rules={[
                  { required: true, message: t("event_form.head_to_head") },
                ]}
              />
            </div>

            {/* Ticket prices section with nested serviceFee and processingFee */}
            {["tribune", "annexeLoge", "logeVIP", "logeVVIP"].map((section) => (
              <div key={section} className="mt-5">
                <Typography.Title
                  level={3}
                  className="!text-base-color !font-normal"
                >
                  {t(`event_form.${section}_heading`) || section}
                </Typography.Title>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <ReuseInput
                    label={t("event_form.tribune")}
                    inputType="normal"
                    name={section}
                    type="number"
                    placeholder={t(`event_form.${section}_placeholder`)}
                    rules={[
                      {
                        required: true,
                        message: t(`event_form.${section}_price`),
                      },
                    ]}
                  />
                  <ReuseInput
                    label={t("event_form.service_fee")}
                    inputType="normal"
                    name={`ticketPrices.${section}.serviceFee`}
                    type="number"
                    placeholder={t("event_form.service_fee_placeholder")}
                    rules={[
                      { required: true, message: t("event_form.service_fee") },
                    ]}
                  />
                  <ReuseInput
                    label={t("event_form.processing_fee")}
                    inputType="normal"
                    name={`ticketPrices.${section}.processingFee`}
                    type="number"
                    placeholder={t("event_form.processing_fee_placeholder")}
                    rules={[
                      {
                        required: true,
                        message: t("event_form.processing_fee"),
                      },
                    ]}
                  />
                </div>
              </div>
            ))}

            <ReuseButton variant="secondary" htmlType="submit" className="mt-8">
              {t("event_form.update")}
            </ReuseButton>
          </ReusableForm>
        )}
      </div>
    </Modal>
  );
};

export default AdminEditEventModal;
