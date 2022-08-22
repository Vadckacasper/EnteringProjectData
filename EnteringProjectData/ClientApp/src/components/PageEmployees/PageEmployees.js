import React from "react";
import {useState, useEffect } from "react";
import {TableEmployees} from "../TableEmployees/TableEmployees";
import { FormCreateEmployee } from "../FormCreateEmployee/FormCreateEmployee";
import { Link } from "react-router-dom";

export function PageEmployees(){

  const [Data, setData] = useState([]);

  useEffect(() => {
    Load();
  },[]);

const Load = async() => {
    const response = await fetch('api/employees');
    if(response.ok)
    {
    const data = await response.json();
    setData(data);
    console.log(Data);
    }
  }


    return(
      <div>
        <FormCreateEmployee update={Load} />
       <TableEmployees update={Load} data={Data} />
        <Link to={"/project/create"}>Создать проект</Link>
      </div>
    );
  
}
