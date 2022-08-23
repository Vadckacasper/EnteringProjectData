import React from "react";
import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormAddEmployee } from "../FormAddEmployee/FormAddEmployee";
import { ListEmployees } from "../ListEmployees/ListEmployees";

export function FormEditProject() {
    const [Data, setData] = useState(0);
    const [Employees, setEmployees] = useState([]);
    const params = useParams();
    const Id = params.id;

    useEffect(() => {
        Load();
        LoadEmloyee();
      },[Id]);

    const Load = async() => {
        const response = await fetch(`api/projects/${Id}`);
        if (response.ok) {
        const data = await response.json();
        setData(data);
        }
      }

      const LoadEmloyee = async() => {
        const response = await fetch(`api/employees/_project/${Id}`);
        if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        }
      }

  const Put = async (event) => {
    await event.preventDefault();

    const project = {
      Id: Id,
      Name: Data.name,
      CustomerCompany: Data.customerCompany,
      ImplementingCompany: Data.implementingCompany,
      StartDates: Data.startDates,
      EndDates: Data.endDates,
      Priority: Data.priority,
      Id_Manager: Data.id_Manager,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    };
    await fetch(`/api/projects/${Id}`, requestOptions);
  };

  const handleInputChange = (e) => {
    setData({...Data, [e.target.name]: e.target.value});
}

  const IdManagerChahge = (id_Manager) =>{
    setData({...Data, id_Manager: id_Manager});
  }

  return (
    <div>
    <form onSubmit={Put} id="create-project-form">
      <div className="mb-3">
        <label className="form-label">Название проекта</label>
        <input
          type="text"
          className="form-control"
          name="name"
          maxLength={50}
          value={Data.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Компания заказчик</label>
        <input
          type="text"
          className="form-control"
          name="customerCompany"
          maxLength={50}
          value={Data.customerCompany}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Компания исполнитель</label>
        <input
          type="text"
          className="form-control"
          name="implementingCompany"
          maxLength={50}
          value={Data.implementingCompany}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Дата начала</label>
          <input
          
            type="date"
            className="form-control"
            name="startDates"
            value={Data.startDates}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label className="form-label">Дата окончания</label>
          <input
            type="date"
            className="form-control"
            name="endDates"
            value={Data.endDates}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label className="form-label">Приоритет</label>
          <input
            type="number"
            min="1"
            className="form-control"
            name="priority"
            value={Data.priority}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-outline-primary mt-2">
        Отправить
      </button>
    </form>
    <FormAddEmployee id={Id} update={LoadEmloyee} />
    <ListEmployees id={Id} id_Manager={Data.id_Manager} put={IdManagerChahge} employees={Employees} update={LoadEmloyee} />
    </div>
  );
}
