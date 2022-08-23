import React from "react";
import { useState, useEffect } from "react";

export function Employee(props) {
  const [Data, setData] = useState(0);

  useEffect(() => {
    setData(props.employee);
  }, [props]);


  const addEmployee = async (e) =>
  {
    const projectsEmployee = {
      Id_Project: props.idProject,
      Id_Employee: props.employee.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectsEmployee),
    };
    const response = await fetch(`/api/projectsEmployees`, requestOptions);
     if (response.ok) {
      props.update();
      }
    }

  return (
    <div>
      <button onClick={addEmployee} type="button" className="list-group-item list-group-item-action">
        {Data.suname} {Data.name} {Data.patronymic} {Data.email}
      </button>
    </div>
  );
}
