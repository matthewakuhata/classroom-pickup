import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFetchData } from "../../shared/hooks/useFetchData";

import { StudentType } from "../Classrooms/types";

import "./Registration.scss";

const Registrations = () => {
  const navigate = useNavigate();
  const { data: students, loading: studentsLoading } =
    useFetchData<StudentType[]>("/api/v1/student");
  const { data: licencesPlates, loading: licencesPlatesLoading } = useFetchData<
    string[]
  >("/api/v1/car/options");

  const [licenceError, setLicenceError] = useState("");
  const [studentError, setStudentError] = useState("");

  const licenceRef = useRef<HTMLInputElement>(null);
  const studentsRef = useRef<any>(null);

  // Use custom hook & useReducer for formState & validation
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
    } else if (licencesPlates.findIndex((plate) => plate === licence) >= 0) {
      setLicenceError(
        "Licence plate already registered! Please enter a new one."
      );
      isValid = false;
    }

    if (!students) {
      setStudentError("Please select at least one student!");
      isValid = false;
    }

    return isValid;
  };

  if (studentsLoading || licencesPlatesLoading) {
    return <div>Loading State...</div>;
  }

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
          aria-label="related-students"
          onChange={() => !!studentError && setStudentError("")}
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
          <span className="registration__error-message">{studentError}</span>
        )}
      </div>
      <button
        disabled={!!licenceError || !!studentError}
        onClick={addRegisteredVehicleHandler}
      >
        Register
      </button>
    </div>
  );
};

export default Registrations;
