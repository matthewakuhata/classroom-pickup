import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Nav/Header";
import Classrooms from "./Pages/Classrooms/Classrooms";
import Registrations from "./Pages/Registrations/Registrations";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Classrooms />} />
          <Route path="/registration" index element={<Registrations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
