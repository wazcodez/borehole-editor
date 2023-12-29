import BlockRowViewLayout from "./../BlockRowViewLayout";
import Icon from "./../../../../common/Icon";
import { Tag } from "antd";

const LocationTag = ({ title, value, placeholder }) => {
  if (value !== null && value !== undefined && value !== "") {
    return (
      <Tag
        color="blue"
        style={{
          display: "flex",
          alignItems: "center",
          lineHeight: "auto",
        }}
      >
        {`${title}: ${value}`}
      </Tag>
    );
  } else {
    return (
      <Tag
        style={{
          display: "flex",
          alignItems: "center",
          lineHeight: "auto",
        }}
      >
        {`${placeholder}`}
      </Tag>
    );
  }
};

const LocationViewer = ({ data }) => {
  const {
    street,
    city,
    province,
    postal,
    latitude,
    longitude,
    northing,
    easting,
    zone,
    access_information,
    gps_unit,
  } = data;

  const icon =
    street || latitude ? (
      <Icon name={"location"} />
    ) : (
      <Icon name={"location"} style={"text-gray-500"} />
    );

  const _street = street ? (
    <span>{`${street}.`}</span>
  ) : (
    <span className="text-gray-500">Street Address. </span>
  );

  const _city = city ? (
    <span>{`${city},`}</span>
  ) : (
    <span className="text-gray-500">City,</span>
  );

  const _province = province ? (
    <span>{`${province},`}</span>
  ) : (
    <span className="text-gray-500">Province,</span>
  );

  const _postal = postal ? (
    <div>{`${postal}`}</div>
  ) : (
    <span className="text-gray-500">Postal Code</span>
  );

  const _latitude = latitude ? (
    <Tag
      color="blue"
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "auto",
      }}
    >
      {`LAT: ${latitude}`}
    </Tag>
  ) : (
    <Tag
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "auto",
      }}
    >
      {`Latitude`}
    </Tag>
  );

  const _longitude = longitude ? (
    <Tag
      color="blue"
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "auto",
      }}
    >
      {`LON: ${longitude}`}
    </Tag>
  ) : (
    <Tag
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "auto",
      }}
    >
      {`Longitude`}
    </Tag>
  );

  const access_notes = access_information ? (
    <div>{access_information}</div>
  ) : (
    <div className="text-gray-500">
      Notes and Access Information & Landmarks
    </div>
  );

  return (
    <BlockRowViewLayout icon={icon}>
      <div className="flex flex-col flex-wrap  justify-center align-middle">
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-row">
            {_street}
            &nbsp;
            {_city}
            &nbsp;
            {_province}
            &nbsp;
            {_postal}
            <span> </span>
          </div>
          {gps_unit === "latlong" && (
            <div className="pl-2">
              <LocationTag
                title={"LAT"}
                placeholder="Latitude"
                value={latitude}
              />
            </div>
          )}
          {gps_unit === "latlong" && (
            <div className="pl-1">
              <LocationTag
                title={"LON"}
                placeholder="Longitude"
                value={longitude}
              />
            </div>
          )}
          {gps_unit === "utm" && (
            <div className="pl-1">
              <LocationTag title={"Z"} placeholder="Zone" value={zone} />
            </div>
          )}

          {gps_unit === "utm" && (
            <div className="pl-1">
              <LocationTag
                title={"N"}
                placeholder="Northing"
                value={northing}
              />
            </div>
          )}
          {gps_unit === "utm" && (
            <div className="pl-1">
              <LocationTag title={"E"} placeholder="Easting" value={easting} />
            </div>
          )}
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="text-xs">{access_notes}</div>
        </div>
      </div>
    </BlockRowViewLayout>
  );
};

export default LocationViewer;
