import React from "react"
import {useState} from "react";

export function FormCreateEmployee(props) {

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
      const response = await fetch("/api/employees", requestOptions);

      if(response.ok){
        props.update();
        document.getElementById("create-employee-form").reset();
      }
    };

  const handleInputChange = (e) => {
    setData({...Data, [e.target.name]: e.target.value});
}

  return (
    <form className="mt-3 mb-2" onSubmit={Post} id="create-employee-form">     
      <div className="row">
        <div className="col">
          <input
            placeholder="Имя"
            type="text"
            className="form-control"
            name="name"           
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <input
          placeholder="Фамилия"
            type="text"
            className="form-control"
            name="surname"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <input
          placeholder="Отчество"
            type="text"
            className="form-control"
            name="patronymic"
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <input
          placeholder="Почта"
            type="email"
            className="form-control"
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary col">
        Добавить
      </button>
      </div>
    </form>
  );
}
