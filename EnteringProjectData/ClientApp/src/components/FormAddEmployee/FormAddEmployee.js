import React from "react";
import { useState } from "react";
import { Employee } from "../Employee/Employee";
export function FormAddEmployee(props) {
  const [Data, setData] = useState(0);
  const [Employees, setEmployees] = useState([]);

  const handleInputChange = async (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
    var response;
    if (Data.name !== undefined) {
      response = await fetch(`/api/employees/_search${Data.name}:${props.id}`);

      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    }
  };

  const Update = () =>{
    props.update();
    document.getElementById("create-employee-form").reset();
    setEmployees([]);
    renderEmployeesData(Employees);
  }

  const renderEmployeesData = (Employees) => {
    return Employees.map((employee, key) => (
      <Employee key={key} idProject={props.id} employee={employee} update={Update} />
    ));
  };

  return (
    <div>
      <form className="mt-3 mb-2" id="create-employee-form">
        <div className="row">
          <div className="col-3">
          <label className="form-label">Добавить сотрудника</label>
            <input
              placeholder="ФИО"
              type="text"
              className="form-control"
              name="name"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
      {renderEmployeesData(Employees)}
    </div>
  );
}
