import React from "react";
import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function PageProject(){

    const [Data, setData] = useState(0);
    const params = useParams();
    const Id = params.id;

    useEffect(() => {
        Load();
      },[Id]);

    const Load = async() => {
        const response = await fetch(`api/projects/${Id}`);
        if (response.ok) {
        const data = await response.json();
        setData(data);
        }
      }

      return(
        <div>
        {Data.name}
        </div>
    );
}
