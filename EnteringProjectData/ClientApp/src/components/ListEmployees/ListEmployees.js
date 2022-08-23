import React from "react";
import { useState, useEffect } from "react";
import { ButtonDelete } from "../ButtonDelete/ButtonDelete";

export function ListEmployees(props) {
  const [Employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(props.employees);
  }, [props]);

  const Delete = async (id) => {
    const response = await fetch(`api/projectsEmployees/${props.id}:${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      props.update();
    }
  };

  const ChangeRadio = async (event) => {
    props.put(event.target.id)
  };

  const addInput = (id) => {
    if (props.id_Manager === id)
    {
      return(
      <input
        id={id}
        className="form-check-input me-3"
        type="radio"
        name="flexRadioDisabled"
        onChange={ChangeRadio}
        checked
      />)
    }
    else
    {
      return(
      <input
        id={id}
        className="form-check-input me-3"
        type="radio"
        name="flexRadioDisabled"
        onChange={ChangeRadio}
      />)
    }
  };

  const renderList = (Data) => {
    return (
      <ol className="list-group list-group">
        {Data.map((data) => (
          <li
            key={data.id}
            className="list-group-item w-50 d-flex justify-content-between"
          >
            <div>
              {data.name} {data.suname} {data.patronymic} {data.email}
            </div>
            <div className="d-flex">
              {addInput(data.id)}
              <ButtonDelete delete={Delete} id={data.id} />
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div>
      <h5 className="mt-4">Список сотрудников:</h5>
      {renderList(Employees)}
    </div>
  );
}
