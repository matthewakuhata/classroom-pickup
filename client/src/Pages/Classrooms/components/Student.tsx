import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

import "react-tooltip/dist/react-tooltip.css";
import "./Student.scss";

interface StudentProps {
  name: string;
  isActive: boolean;
  id: string;
  onChangeHandler: (value: number) => void;
}

const Student = ({ name, isActive, id, onChangeHandler }: StudentProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChangeHandler(event.target.checked ? 1 : -1);
  };

  return (
    <>
      <div
        className={`student
      ${isActive ? !isChecked && "student--highlight" : "student--disabled"}
      ${isChecked && "student--green"}`}
        id={"student-" + id + name}
      >
        <BsPersonCircle size={20} />
        <label htmlFor={`student-checkbox-${id}`}>{name}</label>
        <input
          id={`student-checkbox-${id}`}
          disabled={!isActive}
          onChange={onChange}
          type="checkbox"
        />
      </div>
    </>
  );
};

export default Student;
