import { ConfigProvider, Select } from "antd";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { AllImages } from "../../../public/images/AllImages";

const { Option } = Select;

const languages = [
  { id: "en", name: "English", flag: AllImages.english },
  { id: "fr", name: "French", flag: AllImages.france },
];

const LanguageChange = () => {
  const selectedLanguage = Cookies.get("teeru_lang");
  const { i18n } = useTranslation();
  const setLanguage = (lang: string) => {
    console.log(lang);
    i18n.changeLanguage(lang);
    Cookies.set("teeru_lang", lang, { path: "/", expires: 365, secure: false });
  };

  return (
    <div>
      <div className="flex justify-end items-end mt-10">
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorTextQuaternary: "#507d18",
                colorBgContainer: "rgba(0,0,0,0)",
                fontSize: 18,
                optionSelectedColor: "#ffffff",
                optionSelectedBg: "#507d18",
                optionActiveBg: "#507d1855",
                colorBorder: "#507d1800",
                colorBgElevated: "#ffffff",
                selectorBg: "#ffffff",
                colorText: "#111111",
                colorTextPlaceholder: "#111111",
                activeOutlineColor: "#D3EBE700",
                activeBorderColor: "#D3EBE700",
                hoverBorderColor: "#D3EBE700",
                colorIcon: "#507d18",
              },
            },
          }}
        >
          <Select
            className="!ring-0 !border-0 !outline-none !shadow-none"
            onChange={(value) => {
              setLanguage(value);
            }}
            defaultValue={selectedLanguage}
          >
            {languages.map(({ id, name, flag }) => (
              <Option
                className="!m-0 !mb-1 flex !justify-center !text-center !items-center "
                key={id}
                value={id}
              >
                <div className="flex items-center gap-2 !text-sm !font-semibold">
                  <img src={flag} alt={name} className="w-auto h-4" />
                  <span>{name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default LanguageChange;
