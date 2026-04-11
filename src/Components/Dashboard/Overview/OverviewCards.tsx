import { useTranslation } from "react-i18next";
import { AllImages } from "../../../../public/images/AllImages";

const OverviewCard = ({
  totalUser,
  totalEarning,
}: {
  totalUser: number;
  totalEarning: number;
}) => {
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      background: "#507D18",
      name: t("dashboard.total_user"),
      icon: AllImages.users,
      count: totalUser,
    },
    {
      id: 2,
      background: "#ACD03D",
      name: t("dashboard.total_earning"),
      icon: AllImages.earning,
      count: `$${totalEarning}`,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-5 mb-5">
      {/* Company  */}
      {data.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="flex items-center p-6 justify-center w-full gap-5 ">
            <img src={item.icon} alt="" className="size-14" />
            <div className=" w-fit flex flex-col justify-center items-center text-center gap-1 ">
              <p className="text-lg sm:text-xl lg:text-2xl  font-bold text-primary-color capitalize tracking-wider">
                {item.count}
              </p>
              <p className="text-base sm:text-lg lg:text-xl  font-medium text-primary-color mb-1  tracking-tight">
                {item.name}
              </p>
            </div>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCard;
