/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
import { toast } from "sonner";
import {
  useGetContactUsQuery,
  useUpdateSettingMutation,
} from "../../../redux/features/setting/settingApi";
import Loading from "../../../ui/Loading";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  const [addStaticContent] = useUpdateSettingMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isFetching } = useGetContactUsQuery({
    type: "privacy-policy",
  });

  useEffect(() => {
    if (data) {
      setContent(data?.data?.content);
    }
  }, [data]);

  const handleOnSave = async () => {
    const data = {
      key: "contact_us",
      content,
    };
    const toastId = toast.loading("Updating Contact Us...");

    try {
      const res = await addStaticContent(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 2000 });
      setContent("");
    } catch (error: any) {
      toast.error("Failed to update Contact Us", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div
      className=" min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          {t("sidebar.contact-us")}
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[95%]">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton
            htmlType="button"
            onClick={handleOnSave}
            variant="secondary"
            className="w-full mt-4"
          >
            {t("extra.save")}
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
