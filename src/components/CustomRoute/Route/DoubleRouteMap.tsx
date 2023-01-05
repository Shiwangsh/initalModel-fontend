import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import ReactLoading from "react-loading";

import ShowDoubleRouteStops from "../Stops/ShowDoubleRouteStops";
import ShowBusInfo from "../Buses/ShowBusInfo";
// import axios from "axios";

const DoubleRouteMap = ({ data, startStop, endStop }: any) => {
  const [userRoute1, setUserRoute1] = useState<any>(data.userRoute[0]);
  const [userRoute2, setUserRoute2] = useState<any>(data.userRoute[1]);
  const [userFair, setUserFair] = useState<any>(data.userFair);

  const [userStops, setUserStops] = useState<any>(data.userStops);
  const [route1Buses, setRoute1Buses] = useState<any>();
  const [route2Buses, setRoute2Buses] = useState<any>();
  const [showBusData, setShowBusData] = useState<any>();
  const userRouteName = `${startStop} to ${endStop}`;

  useEffect(() => {
    if (data.buses) {
      setRoute1Buses(data.buses[1]);
      setRoute2Buses(data.buses[0]);
    }
  }, [data.buses]);

  const mapStyles = {
    height: "600px",
    width: "100%",
  };

  const customStyles = [
    {
      featureType: "administrative",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#e0efef",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
        {
          hue: "#1900ff",
        },
        {
          color: "#c0e8e8",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100,
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          lightness: 700,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#7dcdcd",
        },
      ],
    },
  ];

  let stopsCoords1 = userStops[0].map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  let stopsCoords2 = userStops[1].map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  let userRoutecoords1 = userRoute1.stops.map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  let userRoutecoords2 = userRoute2.stops.map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const showBusInfo = (bus: any) => {
    showBusData === bus ? setShowBusData("") : setShowBusData(bus);
  };

  console.log("---->>", userStops[0][0].latitude);
  if (!isLoaded)
    return (
      <ReactLoading
        type="bubbles"
        color="#000000"
        className="container align-items-center"
      />
    );

  return (
    <div className="m-2">
      <GoogleMap
        zoom={13}
        center={stopsCoords1[Math.round((stopsCoords1.length - 1) / 2)]}
        mapContainerStyle={mapStyles}
        options={{ styles: customStyles }}
      >
        <PolylineF
          path={userRoutecoords1}
          options={{
            strokeColor: "#5fb5b5a0",
            strokeWeight: 3,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
          }}
        />
        <PolylineF
          path={stopsCoords1}
          options={{
            strokeColor: "#45c3b2",
            strokeWeight: 5,

            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
          }}
        />
        <PolylineF
          path={userRoutecoords2}
          options={{
            strokeColor: "#8d489e89",
            strokeWeight: 3,

            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
          }}
        />
        <PolylineF
          path={stopsCoords2}
          options={{
            strokeColor: "#713ac397",
            strokeWeight: 5,

            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
          }}
        />
        <MarkerF
          //Pickup Marker
          clickable={false}
          position={{
            lat: userStops[0][0].latitude,
            lng: userStops[0][0].longitude,
          }}
          icon={{
            path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
            fillColor: "#00d5b9",
            fillOpacity: 1,
            scale: 0.05,
            strokeColor: "#ffffffc0",
            strokeWeight: 2,
          }}
        />
        <MarkerF
          //Drop point Marker
          clickable={false}
          position={{
            lat: userStops[0][userStops[0].length - 1].latitude,
            lng: userStops[0][userStops[0].length - 1].longitude,
          }}
          icon={{
            path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
            fillColor: "#0027d5",
            fillOpacity: 1,
            scale: 0.05,
            strokeColor: "#ffffffc0",
            strokeWeight: 2,
          }}
        />
        <MarkerF
          //Destination Marker
          clickable={false}
          position={{
            lat: userStops[1][userStops[1].length - 1].latitude,
            lng: userStops[1][userStops[1].length - 1].longitude,
          }}
          icon={{
            path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
            fillColor: "#8740f0",
            fillOpacity: 1,
            scale: 0.05,
            strokeColor: "#ffffffc0",
            strokeWeight: 2,
          }}
        />
        {/* {userStops[0].map((stop: any, index: any) => {
          return (
            <MarkerF
              clickable={false}
              key={index}
              position={{
                lat: stop.latitude,
                lng: stop.longitude,
              }}
              icon={{
                path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                fillColor: "#00d5b9",
                fillOpacity: 1,
                scale: 0.05,
                strokeColor: "#ffffffc0",
                strokeWeight: 2,
              }}
            />
          );
        })}
        {userStops[1].map((stop: any, index: any) => {
          return (
            <MarkerF
              clickable={false}
              key={index}
              position={{
                lat: stop.latitude,
                lng: stop.longitude,
              }}
              icon={{
                path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                fillColor: "#8740f0",
                fillOpacity: 1,
                scale: 0.05,
                strokeColor: "#ffffffc0",
                strokeWeight: 2,
              }}
            />
          );
        })} */}
        {typeof route1Buses !== "undefined"
          ? route1Buses.map((bus: any, index: any) => {
              return (
                <>
                  <MarkerF
                    key={index}
                    position={{
                      lat: bus.latitude,
                      lng: bus.longitude,
                    }}
                    icon={{
                      path: "M256 0C390.4 0 480 35.2 480 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H384c-17.7 0-32-14.3-32-32V448H160v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C32 35.2 121.6 0 256 0zM96 160v96c0 17.7 14.3 32 32 32H240V128H128c-17.7 0-32 14.3-32 32zM272 288H384c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H272V288zM112 400c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zM352 80c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16z",
                      fillColor: "#00d5b9",
                      fillOpacity: 1,
                      scale: 0.04,
                      // strokeColor: "#ffffff",
                      strokeWeight: 1,
                    }}
                    onClick={() => showBusInfo(bus)}
                  />
                </>
              );
            })
          : null}
        {typeof route2Buses !== "undefined"
          ? route2Buses.map((bus: any, index: any) => {
              return (
                <>
                  <MarkerF
                    key={index}
                    position={{
                      lat: bus.latitude,
                      lng: bus.longitude,
                    }}
                    icon={{
                      path: "M256 0C390.4 0 480 35.2 480 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H384c-17.7 0-32-14.3-32-32V448H160v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C32 35.2 121.6 0 256 0zM96 160v96c0 17.7 14.3 32 32 32H240V128H128c-17.7 0-32 14.3-32 32zM272 288H384c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H272V288zM112 400c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zM352 80c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16z",
                      fillColor: "#8640f0a9",
                      fillOpacity: 1,
                      scale: 0.04,
                      // strokeColor: "#ffffff",
                      strokeWeight: 1,
                    }}
                    onClick={() => showBusInfo(bus)}
                  />
                </>
              );
            })
          : null}
        {showBusData ? <ShowBusInfo bus={showBusData} /> : null}
      </GoogleMap>
      <ShowDoubleRouteStops
        stops={userStops}
        userRouteName={userRouteName}
        userFair={userFair}
      />
    </div>
  );
};

export default DoubleRouteMap;
