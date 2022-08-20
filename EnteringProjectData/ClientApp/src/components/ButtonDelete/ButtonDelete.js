import React from "react";
import './ButtonDelete.css';
export function ButtonDelete(props) {

  const Delete = () =>{
    props.delete(props.id);
  }
  return (
    <div className="button-delete">
      <i className="fa-solid fa-trash-can" onClick={Delete}></i>
    </div>
  );
}
