import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function ViewRoute() {
  // useEffect(() => {
  //   if (route) {
  //     let positionsNEW = route.stops.map((stop: any) => {
  //       return `${stop.latitude} ${stop.longitude}`;
  //     });
  //   }
  //   // console.log(positionsNEW);
  // });

  const mapStyles = {
    height: "50vh",
    width: "100%",
  };
  const location = useLocation();
  const [route, setRoute] = useState(location.state.route);

  const path = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ];

  // const options = {
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.35,
  //   clickable: false,
  //   draggable: false,
  //   editable: false,
  //   visible: true,
  //   radius: 30000,
  //   paths: [
  //     { lat: 37.772, lng: -122.214 },
  //     { lat: 21.291, lng: -157.821 },
  //     { lat: -18.142, lng: 178.431 },
  //     { lat: -27.467, lng: 153.027 },
  //   ],
  //   zIndex: 1,
  // };

  // const positions = [...route.stops];
  // console.log("new Positions", positions);

  // // let latitudes = positions.map(function (element) {
  // //   return `${element.latitude}`;
  // // });
  // // let longitudes = positions.map(function (element) {
  // //   return `${element.longitude}`;
  // // });

  // // console.log("latitude", latitudes);
  // // console.log("longitudes", longitudes);

  // console.log("ONLY THE LATS n lONS", positions);

  let coords = route.stops.map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  console.log(coords);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgQwreil00NWmBry9d-ChiSiyk2tROwWU",
  });
  if (!isLoaded) return <h1>Loading</h1>;
  return (
    <div className="m-2">
      <GoogleMap
        zoom={13}
        center={{ lat: 27.7, lng: 85.3 }}
        mapContainerStyle={mapStyles}
      >
        return{" "}
        <PolylineF
          path={coords}
          options={{
            strokeColor: "#b820d6c0",
            strokeWeight: 5,

            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            // radius: 30000,
          }}
        />
        ;
        {route.stops.map((stop: any) => {
          return (
            <MarkerF
              position={{
                lat: stop.latitude,
                lng: stop.longitude,
              }}
              icon={{
                path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                fillColor: "#e60000",
                fillOpacity: 0.9,
                scale: 0.05,
                strokeColor: "#b820d6c0",
                strokeWeight: 2,
              }}
            />
          );
        })}
      </GoogleMap>
      <div className="m-2">
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0 text-dark">Route ID</p>
          </div>
          <div className="col-sm-9">
            <p className="text-dark mb-0">{route._id}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0 text-dark">Route Name</p>
          </div>
          <div className="col-sm-9">
            <p className="text-dark mb-0">{route.routeName}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0 text-dark">Number of stops</p>
          </div>
          <div className="col-sm-9">
            <p className=" mb-0 text-dark">{route.stops.length}</p>
          </div>
        </div>
        <br />

        <h4>Stops details</h4>
        <hr style={{ backgroundColor: "#000" }} />
        <Table striped borderless hover responsive>
          <thead>
            <tr>
              <th>Stop Number</th>
              <th>Distance till next Stop</th>
              <th>Latitude co-ordinates</th>
              <th>Longitude co-ordinates</th>
            </tr>
          </thead>
          <tbody>
            {route.stops.map((stop: any) => {
              return (
                <tr>
                  <th>{stop.number}</th>
                  <th>{stop.distance}</th>
                  <th>{stop.latitude.toFixed(3)}</th>
                  <th>{stop.longitude.toFixed(3)}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
