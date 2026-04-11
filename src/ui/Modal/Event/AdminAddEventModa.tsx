/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Typography } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseSelect from "../../Form/ReuseSelect";
import React from "react";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseTimePicker from "../../Form/ReuseTimePicker";
import { useGetCategoryQuery } from "../../../redux/features/category/categoryAPi";
import { ICategoryType } from "../../../types";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddEventMutation } from "../../../redux/features/event/eventApi";
import { FadeLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import ReuseUpload from "../../Form/ReuseUpload";

interface AdminAddEventModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AdminAddEventModal: React.FC<AdminAddEventModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [addEvent] = useAddEventMutation();
  const [date, setDate] = React.useState<string | null>(null); // Ensuring date is always string | null

  const { data, isFetching } = useGetCategoryQuery(
    {
      page: 1,
      limit: 999999,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !isAddModalVisible,
    }
  );

  const allCategory: ICategoryType[] = data?.data?.result;

  const handleDateChange = (_date: any, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      setDate(dateString[0] || null); // Set only the first date or null
    } else {
      setDate(dateString); // If single date is selected, set it directly
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    const dateISO = values.date
      ? values.date.format("YYYY-MM-DDTHH:mm:ss") // local time ISO string without 'Z'
      : new Date().toISOString();
    const timeStr = values.time?.format?.("HH:mm") || "";

    console.log("values.ticketPrices", values.ticketPrices);

    const ticketPrices = {
      tribune: {
        price: Number(values["ticketPrices.tribune.price"]),
        serviceFee: Number(values["ticketPrices.tribune.serviceFee"]),
        processingFee: Number(values["ticketPrices.tribune.processingFee"]),
      },
      annexeLoge: {
        price: Number(values["ticketPrices.annexeLoge.price"]),
        serviceFee: Number(values["ticketPrices.annexeLoge.serviceFee"]),
        processingFee: Number(values["ticketPrices.annexeLoge.processingFee"]),
      },
      logeVIP: {
        price: Number(values["ticketPrices.logeVIP.price"]),
        serviceFee: Number(values["ticketPrices.logeVIP.serviceFee"]),
        processingFee: Number(values["ticketPrices.logeVIP.processingFee"]),
      },
      logeVVIP: {
        price: Number(values["ticketPrices.logeVVIP.price"]),
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

    if (values.image) {
      formData.append("image", values?.image[0]?.originFileObj);
    }

    formData.append("data", JSON.stringify(payload));

    const res = await tryCatchWrapper(
      addEvent,
      { body: formData },
      "Adding Event..."
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
      className="lg:!w-[900px]"
    >
      <div className="p-5">
        {isFetching ? (
          <div className="flex justify-center items-center h-[500px]">
            <FadeLoader color="#507d18" />
          </div>
        ) : (
          <ReusableForm form={form} handleFinish={handleSubmit}>
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
                options={allCategory?.map((category) => ({
                  value: category?._id,
                  label: category?.name,
                }))}
                rules={[{ required: true, message: t("event_form.category") }]}
                placeholder={t("event_form.category_placeholder")}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ReuseDatePicker
                name="date"
                label={t("event_form.date")}
                onChange={handleDateChange}
                placeholder={t("event_form.date_placeholder")}
                rules={[{ required: true }]}
              />
              <ReuseTimePicker
                label={t("event_form.select_time")}
                name="time"
                date={date}
                placeholder={t("event_form.select_time_placeholder")}
                rules={[{ required: true }]}
                disabled={!date}
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
            <ReuseUpload name="image" label={t("event_form.event_image")} />
            <div className="mt-5">
              <ReuseInput
                label={t("event_form.head_to_head")}
                inputType="normal"
                name="head_to_head"
                type="text"
                placeholder={t("event_form.head_to_head_placeholder")}
                rules={[{ required: true, message: t("event_form.location") }]}
              />
            </div>{" "}
            {/* Tribune  */}
            <Typography.Title
              level={3}
              className="!text-base-color !font-normal"
            >
              {t("event_form.tribune_heading")}:
            </Typography.Title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <ReuseInput
                label={t("event_form.tribune")}
                inputType="normal"
                name="ticketPrices.tribune.price"
                type="number"
                placeholder={t("event_form.tribune_placeholder")}
                rules={[{ required: true, message: t("event_form.tribune") }]}
              />
              <ReuseInput
                label={t("event_form.service_fee")}
                inputType="normal"
                name="ticketPrices.tribune.serviceFee"
                type="number"
                placeholder={t("event_form.service_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.service_fee") },
                ]}
              />
              <ReuseInput
                label={t("event_form.processing_fee")}
                inputType="normal"
                name="ticketPrices.tribune.processingFee"
                type="number"
                placeholder={t("event_form.processing_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.processing_fee") },
                ]}
              />
            </div>
            {/* Annexe Loge  */}
            <Typography.Title
              level={3}
              className="!text-base-color !font-normal"
            >
              {t("event_form.annexeLoge_heading")}:
            </Typography.Title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <ReuseInput
                label={t("event_form.tribune")}
                inputType="normal"
                name="ticketPrices.annexeLoge.price"
                type="number"
                placeholder={t("event_form.tribune_placeholder")}
                rules={[{ required: true, message: t("event_form.tribune") }]}
              />
              <ReuseInput
                label={t("event_form.service_fee")}
                inputType="normal"
                name="ticketPrices.annexeLoge.serviceFee"
                type="number"
                placeholder={t("event_form.service_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.service_fee") },
                ]}
              />
              <ReuseInput
                label={t("event_form.processing_fee")}
                inputType="normal"
                name="ticketPrices.annexeLoge.processingFee"
                type="number"
                placeholder={t("event_form.processing_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.processing_fee") },
                ]}
              />
            </div>
            {/* Loge VIP  */}
            <Typography.Title
              level={3}
              className="!text-base-color !font-normal"
            >
              {t("event_form.logeVIP_heading")}:
            </Typography.Title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <ReuseInput
                label={t("event_form.tribune")}
                inputType="normal"
                name="ticketPrices.logeVIP.price"
                type="number"
                placeholder={t("event_form.tribune_placeholder")}
                rules={[{ required: true, message: t("event_form.tribune") }]}
              />
              <ReuseInput
                label={t("event_form.service_fee")}
                inputType="normal"
                name="ticketPrices.logeVIP.serviceFee"
                type="number"
                placeholder={t("event_form.service_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.service_fee") },
                ]}
              />
              <ReuseInput
                label={t("event_form.processing_fee")}
                inputType="normal"
                name="ticketPrices.logeVIP.processingFee"
                type="number"
                placeholder={t("event_form.processing_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.processing_fee") },
                ]}
              />
            </div>
            {/* Loge VVIP  */}
            <Typography.Title
              level={3}
              className="!text-base-color !font-normal"
            >
              {t("event_form.logeVVIP_heading")}:
            </Typography.Title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <ReuseInput
                label={t("event_form.tribune")}
                inputType="normal"
                name="ticketPrices.logeVVIP.price"
                type="number"
                placeholder={t("event_form.tribune_placeholder")}
                rules={[{ required: true, message: t("event_form.tribune") }]}
              />
              <ReuseInput
                label={t("event_form.service_fee")}
                inputType="normal"
                name="ticketPrices.logeVVIP.serviceFee"
                type="number"
                placeholder={t("event_form.service_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.service_fee") },
                ]}
              />
              <ReuseInput
                label={t("event_form.processing_fee")}
                inputType="normal"
                name="ticketPrices.logeVVIP.processingFee"
                type="number"
                placeholder={t("event_form.processing_fee_placeholder")}
                rules={[
                  { required: true, message: t("event_form.processing_fee") },
                ]}
              />
            </div>
            <ReuseButton variant="secondary" htmlType="submit" className="mt-8">
              {t("event_form.create")}
            </ReuseButton>
          </ReusableForm>
        )}
      </div>
    </Modal>
  );
};

export default AdminAddEventModal;
