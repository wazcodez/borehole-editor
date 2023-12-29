import BlockRowEdit from "./../BlockRowEdit";
import Label from "./../../../../common/Label";
import { Radio, InputNumber } from "antd";
import { Select, Input } from "antd";
import { Button } from "antd";

const { Option } = Select;

const GoogleMap = ({ latitude, longitude }) => {
  return (
    <div class="w-3/4 h-12">
      <div className="flex justify-end mr-6">
        <Button
          size={"small"}
          href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
        >
          See in Maps
        </Button>
      </div>
    </div>
  );
};

const LocationCoordinate = ({
  data,
  title,
  valueKey,
  onUpdate,
  placeholder,
  value,
}) => {
  return (
    <div class="flex mb-1">
      <div class="w-1/4 h-12">
        <Label title={title}></Label>
      </div>
      <div class="w-3/4 h-12">
        <InputNumber
          size={"large"}
          style={{ minWidth: "200px" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onUpdate({ ...data, [valueKey]: e });
          }}
        ></InputNumber>
      </div>
    </div>
  );
};

const LocationEditor = ({ data, onUpdate, idx }) => {
  const {
    street,
    city,
    province,
    postal,
    latitude,
    longitude,
    northing,
    easting,
    access_information,
    gps_unit,
    zone,
  } = data;

  return (
    <div className="flex flex-col mt-0 justify-start w-full max-w-lg">
      <BlockRowEdit title={"Address"}>
        <div className="pl-1">
          <Label title={"Street Address"} />
          <Input
            bordered={false}
            size={"large"}
            placeholder="eg. 808 4st NE"
            value={street}
            onChange={(e) => {
              onUpdate({ ...data, street: e.target.value });
            }}
          ></Input>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Label title={"City"} />
              <Input
                bordered={false}
                size={"large"}
                placeholder="eg. Austin"
                value={city}
                onChange={(e) => {
                  onUpdate({ ...data, city: e.target.value });
                }}
              ></Input>
            </div>
            <div className="flex flex-col ml-2">
              <Label title={"Province/State"} />
              <Input
                bordered={false}
                size={"large"}
                value={province}
                placeholder="eg. Ontario"
                onChange={(e) => {
                  onUpdate({ ...data, province: e.target.value });
                }}
              ></Input>
            </div>
            <div className="flex flex-col ml-2">
              <Label title={"Postal Code"} />
              <Input
                bordered={false}
                size={"large"}
                value={postal}
                placeholder="eg. 78652"
                onChange={(e) => {
                  onUpdate({ ...data, postal: e.target.value });
                }}
              ></Input>
            </div>
          </div>
        </div>
      </BlockRowEdit>
      <BlockRowEdit title={"GPS Information"}>
        <div className="flex flex-col mt-2 pl-1">
          <div class="flex">
            <div class="w-1/4 h-12">
              <Label title="Notation"></Label>
            </div>
            <div class="w-3/4 h-12">
              <Radio.Group
                defaultValue="utm"
                size={"small"}
                value={gps_unit}
                onChange={(e) => {
                  onUpdate({
                    ...data,
                    gps_unit: e.target.value,
                    latitude: "",
                    longitude: "",
                    zone: "",
                    northing: "",
                    easting: "",
                  });
                }}
              >
                <Radio value="utm">UTM</Radio>
                <Radio value="latlong">Decimal</Radio>
              </Radio.Group>
            </div>
          </div>

          {gps_unit === "latlong" && (
            <div>
              <LocationCoordinate
                title="Latitude"
                placeholder={`eg. -97.743057`}
                data={data}
                onUpdate={onUpdate}
                value={latitude}
                valueKey="latitude"
              />
              <LocationCoordinate
                title="Longitude"
                placeholder={`eg. -97.743057`}
                data={data}
                onUpdate={onUpdate}
                value={longitude}
                valueKey="longitude"
              />
            </div>
          )}

          {gps_unit === "utm" && (
            <div>
              <div class="flex mb-1">
                <div class="w-1/4 h-12">
                  <Label title={"Zone"}></Label>
                </div>
                <div class="w-2/4 h-12">
                  <Input
                    size={"large"}
                    style={{ minWidth: "200px" }}
                    placeholder={`eg. 17S`}
                    value={zone}
                    onChange={(e) => {
                      onUpdate({ ...data, zone: e.target.value });
                    }}
                  ></Input>
                </div>
              </div>

              <LocationCoordinate
                title="Northing"
                placeholder={`eg. 706832`}
                data={data}
                onUpdate={onUpdate}
                value={northing}
                valueKey="northing"
              />
              <LocationCoordinate
                title="Easting"
                placeholder={`eg. 434664`}
                data={data}
                onUpdate={onUpdate}
                value={easting}
                valueKey="easting"
              />
            </div>
          )}
        </div>
      </BlockRowEdit>
      <BlockRowEdit title={"Access & Landmarks"}>
        <div className="flex flex-col mt-2 pl-1">
          <Label title={"Notes"} />
          <textarea
            placeholder={"Access Information and nearby landmarks"}
            value={access_information}
            onChange={(e) => {
              onUpdate({ ...data, access_information: e.target.value });
            }}
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          ></textarea>{" "}
        </div>
      </BlockRowEdit>
    </div>
  );
};

export default LocationEditor;
