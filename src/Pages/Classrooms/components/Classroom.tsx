import Student from "./Student";

import "./Classroom.scss";
import { useState } from "react";

export type StudentType = {
  id: string;
  name: string;
  registrations: string[];
};

interface ClassroomProps {
  students: StudentType[];
  registration: string;
}

const Classroom = ({ students, registration }: ClassroomProps) => {
  return (
    <div className="classroom">
      <div className="classroom__heading">
        <h2>Classroom</h2>
      </div>
      <ul key={JSON.stringify(students)} className="classroom__student-list">
        {students.map((student) => (
          <Student
            key={student.id}
            name={student.name}
            id={student.id}
            isActive={
              student.registrations.findIndex((val) => val === registration) >=
              0
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default Classroom;
