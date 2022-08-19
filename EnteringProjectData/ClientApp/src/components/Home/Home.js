import React from "react";
import {useState, useEffect } from "react";
import {TableProjects} from "../TableProjects/TableProjects";

export function Home(){

  const [Data, setData] = useState([]);

  useEffect(() => {
    Load();
  },[]);

const Load = async() => {
    const response = await fetch('api/projects');
    if(response.ok)
    {
    const data = await response.json();
    setData(data);
    }
  }

const Delete = (id) =>{
  const data = this.state.data.filter(i => i.id !== id)
  setData({data})
}

const Update = (value) =>{
    setData({films: value});
  }
    return(
      <div>
       <TableProjects data={Data} delete={Delete} />
      </div>
    );
  
}
