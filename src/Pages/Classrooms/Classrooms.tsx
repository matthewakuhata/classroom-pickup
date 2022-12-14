import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";

import Classroom from "./components/Classroom";

import "./Classrooms.scss";

const CLASSROOMS = [
  [
    { name: "Jon Doe", id: "1", registrations: ["Q3AWT67"], classroomId: 1 },
    {
      name: "Miriam Fairburn ",
      id: "2",
      registrations: ["QS0KZH2"],
      classroomId: 1,
    },
    {
      name: "Dorthy Jack",
      id: "3",
      registrations: ["NV37L4O"],
      classroomId: 1,
    },
    {
      name: "Humphrey Chance",
      id: "4",
      registrations: ["Q3AWT67", "O10ET9K"],
      classroomId: 1,
    },
    {
      name: "Linden Wolf",
      id: "5",
      registrations: ["940Z895", "TKDY153"],
      classroomId: 1,
    },
    {
      name: "Doyle Bryce",
      id: "6",
      registrations: ["940Z895", "TKDY153"],
      classroomId: 1,
    },
  ],
  [
    { name: "Bill Cobb", id: "7", registrations: ["2AQZ8BC"], classroomId: 2 },
    {
      name: "Raja Massey ",
      id: "8",
      registrations: ["QS0KZH2"],
      classroomId: 2,
    },
    {
      name: "Willie Mckinney",
      id: "9",
      registrations: ["TZX090Q", "2SAKR0N"],
      classroomId: 2,
    },
    {
      name: "Heidi Schwartz",
      id: "10",
      registrations: ["RZR0C5S", "Q758594"],
      classroomId: 2,
    },
    {
      name: "Emmy Mcguire",
      id: "11",
      registrations: ["2SAKR0N", "OETGJEN"],
      classroomId: 2,
    },
  ],
];
const Classrooms = () => {
  const [registration, setRegistration] = useState("");
  const [error, setError] = useState("");
  const [seenRegistrations, setSeenRegistrations] = useState<{
    [key: string]: boolean;
  }>({});
  const regRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    if (!regRef.current) return;

    const value = regRef.current.value;
    if (!value.trim()) return;

    if (seenRegistrations[value]) {
      setError(regRef.current.value);
      setRegistration("");
    } else {
      setRegistration(value);
      setSeenRegistrations((prev) => ({ ...prev, [value]: true }));
    }
  };

  return (
    <div className="classrooms">
      <div className="classrooms__search">
        <input
          name="registration"
          className={error ? "error" : ""}
          onChange={() => setError("")}
          ref={regRef}
          placeholder="Enter registration..."
          type="text"
        />
        <button onClick={searchHandler}>
          <BsSearch />
        </button>
      </div>
      {error && (
        <span className="classrooms__error-message">
          Registration "{error}" has already been entered. Please try again!
        </span>
      )}
      <div className="classrooms-container">
        {CLASSROOMS.map((students, index) => (
          <Classroom
            key={`classroom-${index}`}
            students={students}
            registration={registration}
          />
        ))}
      </div>
    </div>
  );
};

export default Classrooms;
