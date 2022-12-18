import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentType } from "../../Classrooms/types";
import Select from "react-select";
import LoadingBar from "../../../shared/components/LoadingBar/LoadingBar";

interface UpdateRegistrationProps {
  licencePlates: string[];
  students: StudentType[];
}
const UpdateRegistration: React.FC<UpdateRegistrationProps> = ({
  licencePlates,
  students,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const licenceRef = useRef<any>(null);
  const studentRef = useRef<any>(null);

  const updateStudentCars = () => {
    if (!studentRef.current || !licenceRef.current) return;

    const studentValues = studentRef.current.getValue();
    if (!studentValues.length || !studentValues[0].value.id) {
      return setError(true);
    }

    const studentValue = studentValues[0]?.value;
    const licenceValue = licenceRef.current
      .getValue()
      .map((plate: any) => plate.value);

    setLoading(true);
    fetch("/api/v1/student", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...studentValue,
        classroomId: studentValue.classroom,
        registrations: licenceValue,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert(`Successfully updated ${studentValue.name}`);
          navigate("/");
        } else {
          alert("Something went wrong! Please try again");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const plateOptions = licencePlates.reduce((obj, item) => {
    return { ...obj, [item]: { value: item, label: item } };
  }, {});

  const onChangeHandler = (e: any) => {
    if (!e || !e.value) return;

    const cars = e.value.cars;
    if (!cars.length) return;

    licenceRef.current.setValue(
      cars.map((car: string) => ({ value: car, label: car }))
    );
  };

  return (
    <div className="registration">
      {loading ? (
        <LoadingBar />
      ) : (
        <>
          <div className="registration__vehicle">
            <label htmlFor="update-student">Student</label>
            <Select
              ref={studentRef}
              onFocus={() => setError(false)}
              onChange={onChangeHandler}
              aria-label="update-student"
              className={`registration__student__select`}
              options={students.map((student) => ({
                label: student.name,
                value: student,
              }))}
            />
            {error && (
              <span className="registration__error-message">
                Please select a student
              </span>
            )}
          </div>
          <div className="registration__students">
            <label htmlFor="update-licence-plates">Licence Plates</label>
            <Select
              ref={licenceRef}
              aria-label="update-licence-plates"
              className={`registration__student__select`}
              closeMenuOnSelect={false}
              isMulti
              options={Object.values(plateOptions)}
            />
          </div>
          <button onClick={updateStudentCars}>Update</button>
        </>
      )}
    </div>
  );
};

export default UpdateRegistration;
