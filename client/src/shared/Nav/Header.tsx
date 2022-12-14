import { AiFillCar } from "react-icons/ai";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <h2>
          <AiFillCar size={40} /> Student Pickup
        </h2>
      </a>
      <nav>
        <a href="/">Classrooms</a>
        <a href="/registration">Registrations</a>
      </nav>
    </header>
  );
};

export default Header;
