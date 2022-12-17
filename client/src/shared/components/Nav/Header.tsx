import { AiFillCar } from "react-icons/ai";
import { Link } from "react-router-dom";
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
        <Link to="/">Classrooms</Link>
        <Link to="/registration">Registrations</Link>
      </nav>
    </header>
  );
};

export default Header;
