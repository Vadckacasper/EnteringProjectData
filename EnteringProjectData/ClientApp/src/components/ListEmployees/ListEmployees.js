import React from "react";
import {useState, useEffect } from "react";
import { ButtonDelete } from "../ButtonDelete/ButtonDelete";

export function ListEmployees(props){

    const [Employees, setEmployees] = useState([]);

    useEffect(() => {
      Load();
    },[props.id]);
    
    const Load = async() => {
        const response = await fetch(`api/employees/_project/${props.id}`);
        if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        }
      }

      const Delete = async (id) =>{
        const response = await fetch(`api/projectsEmployees/${props.id}:${id}`, { method: 'DELETE' });
        if(response.ok){
          Load();
        }
      }

      const ChangeRadio = async (event) =>{
        const response = await fetch(`api/projects/_addManager${props.id}:${event.target.id}`);
      }
  
      const renderList = (Data) =>{
          return(
            <ol class="list-group list-group-numbered">
            {Data.map((data) => (             
              <li key={data.id} className="list-group-item w-50 d-flex justify-content-between align-items-center">{data.name} {data.suname} {data.patronymic} {data.email}
              <input className="form-check-input" type="radio" name="flexRadioDisabled" id={data.id} onChange={ChangeRadio} />
              <ButtonDelete delete={Delete} id={data.id}/>
              </li>
            ))}
            </ol>
          );
      }

    return(
        <div>
             <h5 className="mt-4">Список сотрудников:</h5>
             {renderList(Employees)}
        </div>
    );
}
