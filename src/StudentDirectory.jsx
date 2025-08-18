import { useState } from "react";
import "./App.css";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const addStudent = () => {
    if (name && course) {
      setStudents([...students, { id: Date.now(), name, course }]);
      setName("");
      setCourse("");
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <h1>Student Directory</h1>
      <div className="form">
        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button onClick={addStudent}>Add</button>
      </div>

      <div className="card-list">
        {students.map((student) => (
          <div key={student.id} className="card">
            <h3>{student.name}</h3>
            <p>{student.course}</p>
            <button onClick={() => deleteStudent(student.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
