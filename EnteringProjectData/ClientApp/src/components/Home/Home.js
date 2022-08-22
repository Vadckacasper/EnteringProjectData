import React from "react";
import { useState, useEffect } from "react";
import { TableProjects } from "../TableProjects/TableProjects";
import { FormFilterDate } from "../FormFilterDate/FormFilterDate";
import { Link } from "react-router-dom";
export function Home() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  const Load = async () => {
    const response = await fetch("api/projects");
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  };

  const Update = (data) => {
    setData(data);
  }

  return (
    <div>
      <FormFilterDate update={Update} />
      <TableProjects update={Load} data={Data} />
      <Link to={"/project/create"}>Создать проект</Link>
    </div>
  );
}
