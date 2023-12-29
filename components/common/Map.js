import React from "react";
import { useState, useRef, useCallback } from "react";
import {Button, TextContainer, Modal} from '@shopify/polaris';
import useSupercluster from "use-supercluster";
import MapGL, {
  Popup,
  NavigationControl,
  FlyToInterpolator,
  Marker,
} from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWtzdXRoYXIiLCJhIjoiY2twamdyOW1rMGJ0NDJvcGFheW83ZWNwYyJ9.Eu6ORa0CZsjvMc8Fbhtb-A";

const MARKER_ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

const navStyle = {
  position: "absolute",
  top: 0,
  right: 30,
  padding: "10px",
};



const BoreholeMarker = ({ uid, id, name, latitude, longitude, setData }) => (
  <Marker
    key={`borehole-${id}`}
    latitude={latitude}
    longitude={longitude}
    onClick={() => {
        setData({ uid, latitude, longitude, id, name });
    }}
  >
    <svg
      height={20}
      viewBox="0 0 24 24"
      style={{
        fill: "#d00",
        stroke: "none",
        transform: `translate(${-20 / 2}px,${-20}px)`,
      }}
    >
      <path d={MARKER_ICON} />
    </svg>
  </Marker>
);

const BoreholeMarkerPopup = ({ uid, name, latitude, longitude, onClose }) => (
  <Popup
    key={`popup-${uid}`}
    tipSize={5}
    anchor="top"
    longitude={longitude}
    latitude={latitude}
    closeOnClick={false}
    onClose={onClose}
  >
    <div key={`popup-content-${uid}`}>
        <a href={`/home/boreholes/${uid}`}>{name}</a>
    </div>
  </Popup>
);

const Map = (props) => {

  // modal
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef(null);

  let points = props["data"].features;
  points.forEach(function (element) {
    element.properties.cluster = false;
  });

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 100, maxZoom: 20 },
  });

  const InformationPanel = 
        <div className="map-information-panel">
            <div onClick={handleChange} className="flex flex-row underline hover:text-white">
                <p className="ml-2">Boreholes not displayed in map </p>
                <h3 className="ml-2">{`(${props.missing.length})`}</h3>
            </div>
        </div>

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/navigation-day-v1"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ref={mapRef}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
            id: id,
            name: name,
            uid: uid,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
              <BoreholeMarker
                latitude={latitude}
                longitude={longitude}
                setData={setPopupInfo}
                uid={uid}
                id={id}
                name={name}
              />
          );
        })}

        {popupInfo && (
            <BoreholeMarkerPopup
                uid={popupInfo.uid}
                name={popupInfo.name}
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={setPopupInfo}
            />
        )}

        <div className={"map-nav"} style={navStyle}>
          <NavigationControl />
        </div>
        <Modal
            activator={InformationPanel}
            open={active}
            onClose={handleChange}
            title="Boreholes missing location coordinates"
      >
          <div>
              <h4 className="text-md ml-8 mt-4 mb-6">
                  Boreholes listed below do not have latitude and longitude coordinates associated with it's location. Currently ONLY boreholes with latitude and longitude coordinates will be displayed on the map.
              </h4>
          </div>
          <ul className="list-disc ml-16 mb-6">
              {
                props.missing.map((item) => {
                    return (
                        <li key={`missing-borehole-${item.uid}`}>
                            <a className="underline" href={`/home/boreholes/${item.uid}`}>{`${item.name}`}</a>
                        </li>
                    )
                })
              }
          </ul>
      </Modal>
        
      </MapGL>
    </>
  );
};

export default Map;
