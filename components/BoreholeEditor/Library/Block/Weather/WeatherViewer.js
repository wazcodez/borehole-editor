import Icon from "./../../../../common/Icon";
import BlockRowViewLayout from "./../BlockRowViewLayout";

const WeatherViewer = ({ data }) => {
  const {
    weather,
    temprature,
    temprature_unit,
    notes,
    temprature_title,
  } = data;

  const icon = weather ? (
    <Icon name={weather.toLowerCase()} />
  ) : (
    <Icon name={"sunny"} style={"text-gray-500"} />
  );

  const heading = temprature_title ? (
    <h2 className="pr-2 border-r border-gray-500">{temprature_title}</h2>
  ) : (
    <h2 className="pr-2 border-r border-gray-200 text-gray-500">
      Weather Description
    </h2>
  );

  const subtext = notes ? (
    <p className="text-xs">{notes}</p>
  ) : (
    <p className="text-xs text-gray-500">Weather notes... </p>
  );

  return (
    <BlockRowViewLayout icon={icon}>
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-row flex-wrap">
          {heading}
          {temprature && temprature_unit && (
            <h2 className="pl-2">{`${temprature} ${temprature_unit}`}</h2>
          )}
        </div>
        <div className="flex flex-row flex-wrap">{subtext}</div>
      </div>
    </BlockRowViewLayout>
  );
};

export default WeatherViewer;
