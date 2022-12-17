import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

import Classroom from "./components/Classroom";
import { useFetchData } from "../../shared/hooks/useFetchData";
import { ClassroomType, SeenPlates } from "./types";

import "./Classrooms.scss";
import LoadingBar from "../../shared/components/LoadingBar/LoadingBar";

const Classrooms = () => {
  const { data: classrooms, loading } =
    useFetchData<ClassroomType[]>("/api/v1/classroom");

  const [registration, setRegistration] = useState("");
  const [seenPlates, setSeenPlates] = useState<SeenPlates>({});
  const [error, setError] = useState("");
  const regRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    if (!regRef.current) return;

    const value = regRef.current.value;
    if (!value.trim() || seenPlates[value]) {
      setError(
        value
          ? `Registration "${value}" has already been entered. Please enter a new registration!`
          : "Please enter a valid registration!"
      );
      setRegistration("");
    } else {
      setRegistration(value);
      setSeenPlates((prev) => ({ ...prev, [value]: true }));
    }
  };

  const resetHandler = () => {
    setSeenPlates({});
    setRegistration("");
    setError("");
  };

  return (
    <div className="classrooms">
      <div className="classrooms__search">
        <input
          name="registration"
          className={error ? "error" : ""}
          onChange={() => registration && setRegistration("")}
          onFocus={() => setError("")}
          ref={regRef}
          placeholder="Enter registration..."
          type="text"
        />
        <button aria-label="search" onClick={searchHandler}>
          <BsSearch />
        </button>
      </div>
      {error && <span className="classrooms__error-message">{error}</span>}
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="classrooms-container">
          {classrooms &&
            classrooms.map((classroom, index) => (
              <Classroom
                key={`classroom-${classroom.id}`}
                students={classroom.students}
                registration={registration}
              />
            ))}
        </div>
      )}
      <button className="classrooms__reset-button" onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
};

export default Classrooms;
