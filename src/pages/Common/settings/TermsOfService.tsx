import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";

const TermsOfService = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleOnSave = () => {
    console.log("Saved PP");
  };

  return (
    <div
      className=" min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Terms & Conditions
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
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;
