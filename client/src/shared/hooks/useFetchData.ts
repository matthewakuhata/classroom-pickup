import { useEffect, useState } from "react";

export function useFetchData<T>(path: string) {
  const [data, setClassrooms] = useState<T>([] as T);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        setClassrooms(data);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, [path]);

  return { data, error, loading };
}
