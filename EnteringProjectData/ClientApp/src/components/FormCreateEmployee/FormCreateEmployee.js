import React from "react"
import {useState} from "react";

export function FormCreateEmployee() {

    const [Data, setData] = useState(0);

    const Post = async (event) => {
      await event.preventDefault();

      const employee = {
        Name: Data.name,
        Suname: Data.surname,
        Patronymic: Data.patronymic,
        Email: Data.email,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      };
      await fetch("/api/employees", requestOptions);
    };

  const handleInputChange = (e) => {
    setData({...Data, [e.target.name]: e.target.value});
}

  return (
    <form onSubmit={Post} id="create-employee-form">     
      <div className="row">
        <div className="col">
          <label className="form-label">Имя</label>
          <input
            type="text"
            className="form-control"
            name="name"           
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Фамилия</label>
          <input
            type="text"
            className="form-control"
            name="surname"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Отчество</label>
          <input
            type="text"
            className="form-control"
            name="patronymic"
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label className="form-label">Почта</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary mt-2 col">
        Отправить
      </button>
      </div>
    </form>
  );
}
