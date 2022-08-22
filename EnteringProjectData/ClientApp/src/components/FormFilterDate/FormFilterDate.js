import React from "react";
import { useState } from "react";
import './FormFilterDate.css';

export function FormFilterDate(props) {
  const [Data, setData] = useState(0);

  const handleInputChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const getFilter = async (e)=>{
    await e.preventDefault();
    var response;
    if (Data.startDates <= Data.endDates) {
      response = await fetch(`/api/projects/_filterDate${Data.startDates}:${Data.endDates}`);

      if (response.ok) {
        const data = await response.json();
        props.update(data);
      }
    }
  }

  return (
      <form onSubmit={getFilter} className="mt-3 mb-2" id="create-date-form">
      <div className="row">
        <div className="col-2 d-flex">
          <label className="form-label">От:</label>
          <input
            type="date"
            className="form-control ms-2"
            name="startDates"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-2 d-flex">
          <label className="form-label">До:</label>
          <input
            type="date"
            className="form-control ms-2"
            name="endDates"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-1 p-0">
        <button type="submit" className="btn btn-outline-primary">
          <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          </div>
        </div>
      </form>
  );
}
