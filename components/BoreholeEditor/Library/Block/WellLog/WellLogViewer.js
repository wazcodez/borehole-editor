import BlockRowViewLayout from "../BlockRowViewLayout";
import Icon from "../../../../common/Icon";
import { Tag } from "antd";

const WellLog = ({ data }) => {
  const { installation_date } = data;
  const current_installation_date = new Date(installation_date);
  const installation_date_ = current_installation_date.toDateString();

  const icon = <Icon name={"waterwell"} />;

  const _installation_date = installation_date_ ? (
    <div>{`Well Log - ${installation_date_}`}</div>
  ) : (
    <span className="text-gray-500">Installation Date</span>
  );

  return (
    <BlockRowViewLayout icon={icon}>
      <div className="flex flex-col flex-wrap  justify-center align-middle">
        <div className="flex flex-row flex-wrap">{_installation_date}</div>
      </div>
    </BlockRowViewLayout>
  );
};

export default WellLog;
