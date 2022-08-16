import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Home() {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h1>DBiNotebook</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title">Add New Note</h5>
          <form className="my-2">
            <div className="mb-3">
              <label htmlFor="inputTitle" className="form-label">
                Enter Title
              </label>
              <input type="text" className="form-control" id="inputTitle" />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescription" className="form-label">
                Enter Description
              </label>
              <textarea
                className="form-control"
                id="inputDescription"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="inputTag" className="form-label">
                Enter Tag
              </label>
              <input type="text" className="form-control" id="inputTag" />
            </div>
            <button type="submit" className="btn btn-secondary">
              Add New Note
            </button>
          </form>
        </div>
      </div>
      <hr className="bg-primary" />
      <div className="card">
        <div className="card-header">
          Your notes
        </div>
        <div className="card-body">
          <h5 className="card-title">Your notes :</h5>
          {notes.map((note)=>{
            return note.title
          })}
          </div>
          </div>
          
    </div>
  );
}
