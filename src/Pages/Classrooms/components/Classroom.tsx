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
  const [pickedUp, setPickedUp] = useState(0);

  const beenPickedUpHandler = (val: number) => {
    setPickedUp((prev) => prev + val);
  };

  return (
    <div className="classroom">
      <div className="classroom__heading">
        <h2>Classroom</h2>
        <span>
          {pickedUp} / {students.length} Picked up
        </span>
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
            onChangeHandler={beenPickedUpHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default Classroom;
