import React from "react";
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonDelete } from "../ButtonDelete/ButtonDelete";
export function TableProjects(props){
    const [Data, setData] = useState([]);

    useEffect(() => {
      setData(props.data)
    },[props]);
    
    const Delete = async (id) =>{
      await fetch(`api/projects/${id}`, { method: 'DELETE' });
    }

    const renderTable = (Data) =>{
        return(
            <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Название проекта</th>
            <th>Компания заказчик</th>
            <th>Компания исполнитель</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Приоритет</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((cell) => (
            <tr key={cell.id}>
              <td>{cell.name}</td>
              <td>{cell.customerCompany}</td>
              <td>{cell.implementingCompany}</td>
              <td>{cell.startDates}</td>
              <td>{cell.endDates}</td>
              <td>{cell.priority}</td>
              <td>
              <ButtonDelete delete={Delete} id={cell.id}></ButtonDelete>
                <Link to={`/project/${cell.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        );
    }

    return(
        <div>
        {renderTable(Data)}
        </div>
    );
}
