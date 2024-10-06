import { useFormik } from "formik";
import { useEffect, useState } from "react";
import AXIOS from "@/app/config/axios";
import { Sitios } from "@/app/interfaces/Sitios";

export default function useGetOneSite(kioskId: number | string) {
  const [site, setSite] = useState<Sitios | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AXIOS.get<{ sitio: Sitios }>(
          `/sitios/${kioskId}`
        );
        setSite(response.data.sitio);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching site", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [kioskId]);

  return { site, loading, error };
}
