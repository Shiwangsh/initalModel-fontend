import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import ReactLoading from "react-loading";

import ShowSingleRouteStops from "../Stops/ShowSingleRouteStops";
import ShowBusInfo from "../Buses/ShowBusInfo";

const SingleMapRoute = ({ data, startStop, endStop }: any) => {
  const [userRoute, setUserRoute] = useState<any>(data.userRoute[0]);
  const [userStops, setUserStops] = useState<any>(data.userStops);
  const [userFair, setUserFair] = useState<any>(data.userFair);

  const [currentBuses, setCurrentBuses] = useState<any>();
  const [showBusData, setShowBusData] = useState<any>();
  const userRouteName = `${startStop} to ${endStop}`;

  // console.log(">>>", data.userFair);

  useEffect(() => {
    if (data.buses) setCurrentBuses(data.buses);
  }, [data.buses]);

  const mapStyles = {
    height: "600px",
    width: "100%",
    // disableDefaultUI: true,
    mapTypeControl: false,
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

  let coords = userStops.map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });
  let userRoutecoords = userRoute.stops.map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgQwreil00NWmBry9d-ChiSiyk2tROwWU",
  });
  if (!isLoaded)
    return (
      <ReactLoading
        type="bubbles"
        color="#000000"
        className="container align-items-center"
      />
    );
  const showBusInfo = (bus: any) => {
    showBusData === bus ? setShowBusData("") : setShowBusData(bus);
  };
  return (
    <div className="m-2">
      <GoogleMap
        zoom={13}
        center={coords[0]}
        mapContainerStyle={mapStyles}
        options={{ styles: customStyles }}
      >
        <PolylineF
          path={userRoutecoords}
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
          path={coords}
          options={{
            strokeColor: "#45c3b2",
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
            lat: userStops[0].latitude,
            lng: userStops[0].longitude,
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
          //DropOff Marker
          clickable={false}
          position={{
            lat: userStops[userStops.length - 1].latitude,
            lng: userStops[userStops.length - 1].longitude,
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

        {/* {userStops.map((stop: any, index: any) => {
          return (
            <MarkerF
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
        })} */}
        {typeof currentBuses !== "undefined"
          ? currentBuses.map((bus: any, index: any) => {
              return (
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
              );
            })
          : null}
        {showBusData ? <ShowBusInfo bus={showBusData} /> : null}
      </GoogleMap>
      <ShowSingleRouteStops
        stops={userStops}
        userRouteName={userRouteName}
        userFair={userFair}
      />
    </div>
  );
};

export default SingleMapRoute;
