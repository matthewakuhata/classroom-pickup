import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import "./Student.scss";
interface StudentProps {
  name: string;
  isActive: boolean;
  id: string;
  onChangeHandler: (value: number) => void;
}

const Student = ({ name, isActive, id, onChangeHandler }: StudentProps) => {
  return (
      <BsPersonCircle size={20} />
      <label htmlFor={`student-checkbox-${id}`}>{name}</label>
      <input
        id={`student-checkbox-${id}`}
        type="checkbox"
      />
    </div>
  );
};

export default Student;
