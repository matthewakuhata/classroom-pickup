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
  const [isChecked, setIsChecked] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChangeHandler(event.target.checked ? 1 : -1);
  };
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
