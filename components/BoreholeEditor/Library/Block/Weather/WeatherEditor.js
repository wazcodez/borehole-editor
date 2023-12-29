import Tile from "./../../../../common/Tile";
import BlockRowEdit from "./../BlockRowEdit";
import Label from "./../../../../common/Label";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";

export const weatherItems = [
  { title: "Sunny", icon: "sunny" },
  { title: "Cloudy", icon: "cloudy" },
  { title: "Rainy", icon: "rainy" },
  { title: "Foggy", icon: "foggy" },
  { title: "Stormy", icon: "stormy" },
  { title: "Snowy", icon: "snowy" },
];

export const TempratureEntry = ({
  temperature,
  onUpdateTemperature,
  onUpdateTemperatureUnit,
}) => {
  return (
    <div className="mt-2">
      <Label title={"Temperature"} />
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          onChange={(e) => {
            onUpdateTemprature(e.target.value);
          }}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="number"
          min="-200"
          max="1000"
          step="0.001"
          value={temperature}
          placeholder="23.2"
        />
        <div className="absolute inset-y-0 right-0 mr-1 flex items-center">
          <select
            aria-label="Temperature"
            className="form-select h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5"
            onChange={(e) => {
              onUpdateTempratureUnit(e.target.value);
            }}
          >
            <option>deg C</option>
            <option>deg F</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const WeatherEditor = ({ data, onUpdate, idx }) => {
  const {
    weather,
    temprature,
    temprature_unit,
    notes,
    temprature_title,
  } = data;
  const extra = ["1", "2", "3", "4", "5", "6"];
  return (
    <div className="flex flex-col mt-0 justify-start w-full max-w-lg">
      <BlockRowEdit title={"Summary"}>
        <div>
          <Tile
            current={weatherItems.map((a) => a.title).indexOf(weather)}
            onUpdate={(val) => {
              onUpdate({ ...data, weather: val });
            }}
            items={weatherItems}
          />
          <Label title={"Heading"} />
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              onChange={(e) => {
                onUpdate({
                  ...data,
                  temprature_title: e.target.value,
                });
              }}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              value={temprature_title}
            />
          </div>
        </div>
      </BlockRowEdit>
      <BlockRowEdit title={"Extra"}>
        <div className="pl-1">
          <ParamSelectableUnit
            heading={"Temperature"}
            data={{ ...data }}
            value={temprature}
            onUpdate={onUpdate}
            valueKey="temprature"
            unitKey="temprature_unit"
            defaultOption={data.temprature_unit}
            _options={[
              { value: "deg C", title: "deg C" },
              { value: "F", title: "F" },
            ]}
          />

          {/* <TempratureEntry
            unit={temprature_unit}
            temprature={temprature}
            temprature_title={temprature_title}
            onUpdateTemprature={(val) => {
              onUpdate({ ...data, temprature: val });
            }}
            onUpdateTempratureUnit={(val) => {
              onUpdate({ ...data, temprature_unit: val });
            }}
          ></TempratureEntry> */}
          <Label title={"Notes"} />
          <textarea
            placeholder={"Weather related notes (if any)"}
            value={notes}
            onChange={(e) => {
              onUpdate({ ...data, notes: e.target.value });
            }}
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          ></textarea>
        </div>
      </BlockRowEdit>
    </div>
  );
};

export default WeatherEditor;
