import LoadingBar from "../../shared/components/LoadingBar/LoadingBar";
import { useFetchData } from "../../shared/hooks/useFetchData";

import { StudentType } from "../Classrooms/types";
import CreateRegistration from "./components/CreateRegistration";
import UpdateRegistraion from "./components/UpdateRegistraion";

import "./Registration.scss";

const Registrations = () => {
  const { data: students, loading: studentsLoading } =
    useFetchData<StudentType[]>("/api/v1/student");
  const { data: licencePlates, loading: licencePlatesLoading } = useFetchData<
    string[]
  >("/api/v1/car/options");

  if (studentsLoading || licencePlatesLoading) {
    return <LoadingBar />;
  }

  return (
    <>
      <h2>Create new Registration</h2>
      <CreateRegistration students={students} licencePlates={licencePlates} />

      <h2>Update Student Registrations</h2>
      <UpdateRegistraion students={students} licencePlates={licencePlates} />
    </>
  );
};

export default Registrations;
