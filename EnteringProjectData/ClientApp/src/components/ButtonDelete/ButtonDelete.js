import React from "react";
import './ButtonDelete.css';
export function ButtonDelete(props) {

    const Delete = (id) =>{
        props.delete(id);
    }

  return (
    <div className="button-delete">
      <i className="fa-solid fa-trash-can" onClick={Delete(props.id)}></i>
    </div>
  );
}
