import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import ReactLoading from "react-loading";

import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const center = { lat: 48.8584, lng: 2.2945 };

const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const TestCustomRoute = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const [map, setMap] = useState<any>(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [distance, setDistance] = useState<any>();
  const [duration, setDuration] = useState<any>();

  // useEffect(() => {
  //   if (directionsResponse) {
  //     setDistance(directionsResponse.routes[0].legs[0].distance.text);
  //     setDuration(directionsResponse.routes[0].legs[0].duration.text);
  //   }
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // }, [directionsResponse]);

  const originRef = useRef<any>(null);
  console.log(originRef.current.value);
  const destiantionRef = useRef<any>(null);

  async function calculateRoute() {
    if (originRef.current === null || destiantionRef.current === null) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
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

  if (!isLoaded) {
    return (
      <ReactLoading
        type="bubbles"
        color="#000000"
        className="container align-items-center"
      />
    );
  }
  return (
    <div className="m-2">
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={mapStyles}
        options={{ styles: customStyles }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <Autocomplete>
        <input type="text" placeholder="Start Location" ref={originRef} />
      </Autocomplete>
      <br />
      <Autocomplete>
        <input type="text" placeholder="Destination" ref={destiantionRef} />
      </Autocomplete>
      <br />
      <Button variant="info" type="submit" onClick={calculateRoute}>
        Calculate Route
      </Button>
      <Button variant="info" type="submit" onClick={clearRoute}>
        Clear Route
      </Button>
    </div>
  );
};

export default TestCustomRoute;
