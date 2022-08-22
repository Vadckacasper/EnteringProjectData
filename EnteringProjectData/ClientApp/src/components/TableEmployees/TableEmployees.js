import React from "react";
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonDelete } from "../ButtonDelete/ButtonDelete";

export function TableEmployees(props){
    const [Data, setData] = useState([]);

    useEffect(() => {
      setData(props.data)
    },[props]);
    
    const Delete = async (id) =>{
      const response = await fetch(`api/employees/${id}`, { method: 'DELETE' });
      if(response.ok){
        props.update();
      }
    }

    const renderTable = (Data) =>{
        return(
            <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Почта</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((cell) => (
            <tr key={cell.id}>
              <td>{cell.name}</td>
              <td>{cell.suname}</td>
              <td>{cell.patronymic}</td>
              <td>{cell.email}</td>
              <td>
                <ButtonDelete delete={Delete} id={cell.id}></ButtonDelete>
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
