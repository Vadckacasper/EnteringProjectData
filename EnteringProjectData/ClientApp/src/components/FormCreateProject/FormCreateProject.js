import React from "react";

export function FormCreateProject() {
  
  const Post = async (event) => {
    await event.preventDefault();

    event.preventDefault();
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    document.getElementById("create-project-form").reset();

    const project = {
      Name: formObject.Name,
      CustomerCompany: formObject.CustomerCompany,
      ImplementingCompany: formObject.ImplementingCompany,
      StartDates: formObject.StartDates,
      EndDates: formObject.EndDates,
      Priority: formObject.Priority,
      Id_Manager: 1,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    };
    await fetch("/api/projects", requestOptions);
  };

  return (
    <form onSubmit={Post} id="create-project-form">
      <div className="mb-3">
        <label className="form-label">Название проекта</label>
        <input
          type="text"
          className="form-control"
          name="Name"
          maxLength={50}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Компания заказчик</label>
        <input
          type="text"
          className="form-control"
          name="CustomerCompany"
          maxLength={50}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Компания исполнитель</label>
        <input
          type="text"
          className="form-control"
          name="ImplementingCompany"
          maxLength={50}
          required
        />
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Дата начала</label>
          <input
            type="date"
            className="form-control"
            name="StartDates"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Дата окончания</label>
          <input
            type="date"
            className="form-control"
            name="EndDates"
            required
          />
        </div>
        <div className="col">
          <label className="form-label">Приоритет</label>
          <input
            type="number"
            min="1"
            className="form-control"
            name="Priority"
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
