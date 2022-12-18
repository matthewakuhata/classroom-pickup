import { useEffect, useState } from "react";
import { ClassroomType } from "../types";

export const useClassrooms = () => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/v1/classroom");
      if (!response.ok) {
        return setError(true);
      }

      const data = await response.json();
      setClassrooms(data);
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { classrooms, error, loading };
};
