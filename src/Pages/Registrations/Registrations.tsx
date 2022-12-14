import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { StudentType } from "../Classrooms/components/Classroom";

import "./Registration.scss";

const Registrations = () => {
  const [registeredVehicles, setRegisteredVehicles] = useState<string[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [licenceError, setLicenceError] = useState("");
  const [studentError, setStudentError] = useState(false);

  const licenceRef = useRef<HTMLInputElement>(null);
  const studentsRef = useRef<any>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setRegisteredVehicles(["QS0KZH2", "Q3AWT67", "O10ET9K"]);
    };

    const fetchStudents = async () => {
      setStudents([
        {
          name: "Jon Doe",
          id: "1",
          registrations: ["Q3AWT67"],
        },
        {
          name: "Miriam Fairburn ",
          id: "2",
          registrations: ["QS0KZH2"],
        },
        {
          name: "Dorthy Jack",
          id: "3",
          registrations: ["NV37L4O"],
        },
        {
          name: "Humphrey Chance",
          id: "4",
          registrations: ["Q3AWT67", "O10ET9K"],
        },
        {
          name: "Linden Wolf",
          id: "5",
          registrations: ["940Z895", "TKDY153"],
        },
      ]);
    };

    fetchRegistrations();
    fetchStudents();
  }, []);

  const addRegisteredVehicleHandler = () => {
    if (!licenceRef.current || !studentsRef.current) return;
    const licence = licenceRef.current.value;
    const selectedStudent = studentsRef.current
      .getValue()
      .map((obj: { label: string; value: string }) => obj.value) as string[];

    // Use useReducer for formState & validation
    if (!validateInputs(licence, selectedStudent.length)) return;

    console.log(licence, studentsRef);
    // send request here!
    licenceRef.current.value = "";
    studentsRef.current.setValue([]);
  };

  const validateInputs = (licence: string, students: number) => {
    let isValid = true;
    if (!licence) {
      setLicenceError("Please Enter a valid licence plate");
      isValid = false;
    } else if (registeredVehicles.findIndex((veh) => veh === licence) >= 0) {
      setLicenceError(
        "Licence plate already registered! Please enter a new one."
      );
      isValid = false;
    }

    if (!students) {
      setStudentError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="registration">
      <div className="registration__vehicle">
        <label htmlFor="registration-number">Licence Plate</label>
        <input
          className={licenceError && "registration--error"}
          ref={licenceRef}
          onChange={() => !!licenceError && setLicenceError("")}
          id="registration-number"
          type="text"
        />
        {licenceError && (
          <span className="registration__error-message">{licenceError}</span>
        )}
      </div>
      <div className="registration__students">
        <label htmlFor="related-students">Students</label>
        <Select
          onChange={() => !!studentError && setStudentError(false)}
          className={`registration__student__select   ${
            studentError && "registration--error"
          }`}
          id="related-students"
          closeMenuOnSelect={false}
          isMulti
          ref={studentsRef}
          options={students.map((student) => ({
            label: student.name,
            value: student.id,
          }))}
        />
        {studentError && (
          <span className="registration__error-message">
            Please select at least one student!
          </span>
        )}
      </div>
      <button onClick={addRegisteredVehicleHandler}>Register</button>
    </div>
  );
};

export default Registrations;
