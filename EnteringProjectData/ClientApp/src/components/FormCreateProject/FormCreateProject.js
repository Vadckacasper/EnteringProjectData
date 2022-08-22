import React from "react";
import {useState} from "react";
export function FormCreateProject() {
  const [Data, setData] = useState(0);

  const Post = async (event) => {
    await event.preventDefault();
    const project = {
      Name: Data.name,
      CustomerCompany: Data.customerCompany,
      ImplementingCompany: Data.implementingCompany,
      StartDates: Data.startDates,
      EndDates: Data.endDates,
      Priority: Data.priority,
      Id_Manager: 1,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    };
    const response = await fetch("/api/projects", requestOptions);
    if(response.ok){
      document.getElementById("create-project-form").reset();
    }
  };

  const handleInputChange = (e) => {
    setData({...Data, [e.target.name]: e.target.value});
}

  return (
    <form onSubmit={Post} id="create-project-form">
      <div className="mb-3">
        <label className="form-label">Название проекта</label>
        <input
          type="text"
          className="form-control"
          name="name"
          maxLength={50}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Компания заказчик</label>
        <input
          type="text"
          className="form-control"
          name="customerCompany"
          maxLength={50}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Компания исполнитель</label>
        <input
          type="text"
          className="form-control"
          name="implementingCompany"
          maxLength={50}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Дата начала</label>
          <input
            type="date"
            className="form-control"
            name="startDates"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Дата окончания</label>
          <input
            type="date"
            className="form-control"
            name="endDates"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Приоритет</label>
          <input
            type="number"
            min="1"
            className="form-control"
            name="priority"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-outline-primary mt-2">
        Отправить
      </button>
    </form>
  );
}
