import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import ReactLoading from "react-loading";

import ShowDoubleRouteStops from "./ShowDoubleRouteStops";

const DoubleRouteMap = ({ data }: any) => {
  const [userStops, setUserStops] = useState<any>(data.userStops);

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

  let coords1 = userStops[0].map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  let coords2 = userStops[1].map((points: any) => {
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

  return (
    <div className="m-2">
      <GoogleMap
        zoom={13}
        center={coords1[0]}
        mapContainerStyle={mapStyles}
        options={{ styles: customStyles }}
      >
        <PolylineF
          path={coords1}
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
          path={coords2}
          options={{
            strokeColor: "#8740f0",
            strokeWeight: 5,

            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
          }}
        />
        {userStops[0].map((stop: any, index: any) => {
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
        })}
        {userStops[1].map((stop: any, index: any) => {
          return (
            <MarkerF
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
        })}
      </GoogleMap>
      <h1 style={{ color: "#00d9ff" }}>
        No. of Stops:{userStops[0].length + userStops[1].length}
      </h1>
      <ShowDoubleRouteStops stops={userStops} />
    </div>
  );
};

export default DoubleRouteMap;
