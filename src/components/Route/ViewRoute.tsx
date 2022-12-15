import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

export default function ViewRoute() {
  const mapStyles = {
    height: "50vh",
    width: "100%",
  };
  const location = useLocation();
  const [route, setRoute] = useState(location.state.route);

  let coords = route.stops.map((points: any) => {
    return { lat: points.latitude, lng: points.longitude };
  });

  console.log(coords);

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
        center={{ lat: 27.7172, lng: 85.324 }}
        mapContainerStyle={mapStyles}
      >
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
        ;
        {route.stops.map((stop: any, index: any) => {
          return (
            <MarkerF
              key={index}
              position={{
                lat: stop.latitude,
                lng: stop.longitude,
              }}
              icon={{
                path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                fillColor: "#000000",
                fillOpacity: 1,
                scale: 0.04,
                strokeColor: "#ffffff",
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
        <Table bordered responsive size="sm" variant="dark">
          <thead className="thead-dark">
            <tr>
              <th>Stop Number</th>
              <th>Stop Name</th>
              <th>Distance till next Stop</th>
              <th>Latitude co-ordinates</th>
              <th>Longitude co-ordinates</th>
            </tr>
          </thead>
          <tbody>
            {route.stops.map((stop: any, index: any) => {
              return (
                <tr key={index}>
                  <th>{stop.number}</th>
                  <th>{stop.name}</th>
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
