import React from "react";
import {useState, useEffect } from "react";
import {TableProjects} from "../TableProjects/TableProjects";
import { Link } from "react-router-dom";
export function Home(){

  const [Data, setData] = useState([]);

  useEffect(() => {
    Load();
  },[Data]);

const Load = async() => {
    const response = await fetch('api/projects');
    if(response.ok)
    {
    const data = await response.json();
    setData(data);
    }
  }


    return(
      <div>
       <TableProjects data={Data} />
        <Link to={"/project/create"}>Создать проект</Link>
      </div>
    );
  
}
