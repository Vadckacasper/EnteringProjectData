import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonDelete } from "../ButtonDelete/ButtonDelete";
import $ from "jquery";
import "./TableProjects.css";
export function TableProjects(props) {
  const [Data, setData] = useState([]);
  const [flag, setflag] = useState(false);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  const Delete = async (id) => {
    const response = await fetch(`api/projects/${id}`, { method: "DELETE" });
    if (response.ok) {
      props.update();
    }
  };

  const Sort = async (event) => {
    const response = await fetch(`api/projects/_sortName${event.target.id}:${flag}`);
    if (response.ok) {
      const data = await response.json();
      setData(data);
      if(flag)
      setflag(false);
      else
      setflag(true);
    }
  };

  const renderTable = (Data) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th id="0" onClick={Sort}>Название проекта</th>
            <th id="1" onClick={Sort}>Компания заказчик</th>
            <th id="2" onClick={Sort}>Компания исполнитель</th>
            <th id="3" onClick={Sort}>Дата начала</th>
            <th id="5" onClick={Sort}>Дата окончания</th>
            <th id="5" onClick={Sort}>Приоритет</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((cell) => (
            <tr key={cell.id}>
              <td>{cell.name}</td>
              <td>{cell.customerCompany}</td>
              <td>{cell.implementingCompany}</td>
              <td>
                {new Date(cell.startDates).toLocaleDateString(
                  navigator.language
                )}
              </td>
              <td>
                {new Date(cell.endDates).toLocaleDateString(navigator.language)}
              </td>
              <td>{cell.priority}</td>
              <td>
                <ButtonDelete delete={Delete} id={cell.id}></ButtonDelete>
                <Link to={`/project/${cell.id}`}>
                  <i className="fa-solid fa-pen-to-square Button-edit"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div>{renderTable(Data)}</div>;
}
