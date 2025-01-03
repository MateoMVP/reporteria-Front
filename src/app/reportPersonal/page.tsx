"use client";
import React, { useState, useEffect } from "react";
import AXIOS from "../config/axios"; // Axios config
import { useRouter } from "next/navigation"; // Para manejar la navegación
import { Bounce, ToastContainer, toast } from "react-toastify";
import Button from "./template/components/Button";

interface InfoReporte {
  _id: string;
  KioskId: number;
  fecha: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  name_tecnico: string;
}
interface reportesPerTecnico {
  [name_tecnico: string]: InfoReporte[];
}

function ReportesTecnico() {
  const [reportes, setReportes] = useState<InfoReporte[]>(); // Datos de los reportes
  const [filteredReportes, setFilteredReportes] = useState<InfoReporte[]>(); // Datos de los reportes filtrados
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const router = useRouter(); // Para redirigir

  // Llamada al backend para obtener los reportes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AXIOS.get("/reportes/personal"); // Endpoint para obtener reportes por técnico
        setReportes(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // toast.error("Error al obtener los reportes", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   closeOnClick: true,
        //   transition: Bounce,
        // });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (reportes) {
      setFilteredReportes(reportes);
    }
  }, [reportes]);
  useEffect(() => {
    if (minDate && maxDate && reportes) {
      const filtered = reportes?.filter((reporte) => {
        return (
          new Date(reporte.fecha) >= new Date(minDate) &&
          new Date(reporte.fecha) <= new Date(maxDate)
        );
      });
      setFilteredReportes(filtered);
    } else if (minDate && reportes) {
      const filtered = reportes?.filter((reporte) => {
        return new Date(reporte.fecha) >= new Date(minDate);
      });
      setFilteredReportes(filtered);
    } else if (maxDate && reportes) {
      const filtered = reportes?.filter((reporte) => {
        return new Date(reporte.fecha) <= new Date(maxDate);
      });
      setFilteredReportes(filtered);
    }
  }, [maxDate, minDate]);
  const [reportesPorTecnico, setReportesPorTecnico] =
    useState<reportesPerTecnico>({});
  useEffect(() => {
    if (filteredReportes) {
      const reportesPorTecnico: reportesPerTecnico = {};
      filteredReportes.forEach((reporte) => {
        if (!reportesPorTecnico[reporte.name_tecnico]) {
          reportesPorTecnico[reporte.name_tecnico] = [];
        }
        reportesPorTecnico[reporte.name_tecnico].push(reporte);
      });
      setReportesPorTecnico(reportesPorTecnico);
    }
  }, [filteredReportes]);
  // Función para manejar el clic en cada fila
  const handleRowClick = (_id: string) => {
    router.push(`/reporte/${_id}`); // Redirigir a la vista de reporte específico
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Reports by technician
      </h1>
      <div className="w-full max-w-6xl overflow-x-auto">
        <Button ruta="/dashboard" />
        <div className=" flex flex-col items-center">
          <div className="flex flex-col w-min sm:flex-row sm:space-x-2 items-center border-l-2 pl-4 shadow-lg bg-white rounded-lg p-2">
            <span className="text-gray-700 px-2">From</span>
            <input
              type="date"
              value={minDate}
              onChange={(e) => setMinDate(e.target.value)}
              className="mb-2 sm:mb-0 bg-gray-100 text-gray-800  rounded-md shadow-md transition duration-200"
            />
            <span className="text-gray-700 px-2">To</span>
            <input
              type="date"
              value={maxDate}
              onChange={(e) => setMaxDate(e.target.value)}
              className="mb-2 sm:mb-0 bg-gray-100 text-gray-800  rounded-md shadow-md transition duration-200"
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center">Load data...</div>
        ) : (
          Object.keys(reportesPorTecnico).map((tecnico) => (
            <div key={tecnico} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                {tecnico} ({reportesPorTecnico[tecnico].length})
              </h2>
              <table className="min-w-full bg-white border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Fecha
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Kiosk ID
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Address
                    </th>{" "}
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportesPorTecnico[tecnico].map((reporte: InfoReporte) => (
                    <tr
                      key={reporte._id}
                      onClick={() => handleRowClick(reporte._id)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.fecha}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.KioskId}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.address}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.name_tecnico}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReportesTecnico;
