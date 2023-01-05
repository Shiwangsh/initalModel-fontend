import React, { useState } from "react";

const StopFields = ({ numberOfFeilds, handleSubmit }: any) => {
  const fields = [];
  const [stops, setStops] = useState<any>([]);
  const defaultValues = {
    number: Number,
    name: String,
    distance: Number,
    latitude: Number,
    longitude: Number,
  };
  const [fieldValue, setFieldValue] = useState<any>(defaultValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  for (let i = 1; i <= numberOfFeilds; i++) {
    fields.push(
      <form className="card-body d-flex" key={i}>
        <label className="ml-2 mr-2">Stop Number</label>
        <input
          type="text"
          id="stopName"
          name="number"
          value={i}
          disabled
          className="form-control rounded-left w-25"
          onChange={handleChange}
        />
        <label className="ml-2 mr-2">Stop Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control rounded-left w-25"
          onChange={handleChange}
        />
        <label className="m-2">Distance</label>
        <input
          type="text"
          id="distance"
          name="distance"
          className="form-control rounded-left w-25"
          onChange={handleChange}
        />

        <label className="m-2">Latitude</label>

        <input
          type="text"
          id="latitude"
          name="latitude"
          className="form-control rounded-left w-25"
          onChange={handleChange}
        />
        <label className="m-2">longitude</label>

        <input
          type="text"
          id="longitude"
          name="longitude"
          className="form-control rounded-left w-25"
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-info ml-2"
          type="submit"
          onClick={(e) => submitSingleStop(e, i)}
        >
          Submit Stop
        </button>
      </form>
    );
  }
  const submitSingleStop = (e: any, i: any) => {
    e.preventDefault();
    fieldValue.number = i;
    setStops([...stops, fieldValue]);
    console.log("STOPSSS___>", stops);
  };
  return (
    <>
      <p style={{ color: "red", marginLeft: "200px" }}>
        PLEASE FILL STOPS ONE-BY-ONE IN THEIR PROPER ORDER!!
      </p>

      {fields}
      <div className="login-wrap p-4">
        <button
          type="submit"
          className="btn btn-info"
          onClick={(e) => handleSubmit(e, stops)}
        >
          Create Route
        </button>
      </div>
    </>
  );
};

export default StopFields;
