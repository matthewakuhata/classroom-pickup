import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentType } from "../../Classrooms/types";
import Select from "react-select";

interface CreateRegistrationProps {
  licencePlates: string[];
  students: StudentType[];
}
const CreateRegistration: React.FC<CreateRegistrationProps> = ({
  licencePlates,
  students,
}) => {
  const [licenceError, setLicenceError] = useState("");
  const [studentError, setStudentError] = useState("");

  const licenceRef = useRef<HTMLInputElement>(null);
  const studentsRef = useRef<any>(null);
  const navigate = useNavigate();

  // Use custom hook & useReducer for formState & validation
  const addRegisteredVehicleHandler = () => {
    if (!licenceRef.current || !studentsRef.current) return;

    const licence = licenceRef.current.value;
    const selectedStudent = studentsRef.current
      .getValue()
      .map((obj: { label: string; value: string }) => obj.value) as string[];

    if (!validateInputs(licence, selectedStudent.length)) return;
    fetch("/api/v1/car", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        licencePlate: licence,
        students: selectedStudent,
      }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/");
        } else {
          alert("Something went wrong! Please try again");
        }
      })
      .catch((error) => console.log(error));
  };

  const validateInputs = (licence: string, students: number) => {
    let isValid = true;
    if (!licence) {
      setLicenceError("Please Enter a valid licence plate");
      isValid = false;
    } else if (licencePlates.findIndex((plate) => plate === licence) >= 0) {
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

export default CreateRegistration;
