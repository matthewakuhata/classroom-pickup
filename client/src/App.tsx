import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/components/Nav/Header";
import Classrooms from "./Pages/Classrooms/Classrooms";
import Registrations from "./Pages/Registrations/Registrations";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Classrooms />} />
            <Route path="/registration" index element={<Registrations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
