"use client";
import React, { useState, useEffect } from "react";
import AXIOS from "../config/axios"; // Axios config
import { Bounce, ToastContainer, toast } from "react-toastify";

interface dataDashboard {
  KioskId: number;
  fecha: string;
  nota: string;
  name_tecnico: string;
  store_Id: number;
}

const data_chat: dataDashboard[] = [
  {
    KioskId: 923,
    fecha: "2020-04-28",
    nota: "Respond claim entire.",
    name_tecnico: "Danielle Vasquez",
    store_Id: 235,
  },
  {
    KioskId: 535,
    fecha: "2023-01-01",
    nota: "Fast carry fine spend.",
    name_tecnico: "Christina Valdez",
    store_Id: 671,
  },
  {
    KioskId: 838,
    fecha: "2020-11-23",
    nota: "Improve somebody body movie smile certain.",
    name_tecnico: "Lauren Day",
    store_Id: 902,
  },
  {
    KioskId: 921,
    fecha: "2022-01-12",
    nota: "Capital film space.",
    name_tecnico: "Tina Rodriguez MD",
    store_Id: 297,
  },
  {
    KioskId: 110,
    fecha: "2022-07-29",
    nota: "Radio world total receive.",
    name_tecnico: "Elizabeth Schmidt",
    store_Id: 561,
  },
  {
    KioskId: 175,
    fecha: "2023-03-07",
    nota: "Someone reality guess however entire.",
    name_tecnico: "Steven Harris",
    store_Id: 435,
  },
  {
    KioskId: 285,
    fecha: "2021-10-15",
    nota: "Mission nature song third top current.",
    name_tecnico: "Christina Williams",
    store_Id: 789,
  },
  {
    KioskId: 951,
    fecha: "2023-06-18",
    nota: "Color several design across statement include.",
    name_tecnico: "Patrick Griffin",
    store_Id: 123,
  },
  {
    KioskId: 201,
    fecha: "2022-08-22",
    nota: "Mission fill visit report beyond event.",
    name_tecnico: "Michael Miller",
    store_Id: 670,
  },
  {
    KioskId: 770,
    fecha: "2023-02-24",
    nota: "Off concern modern leader out player.",
    name_tecnico: "Susan Green",
    store_Id: 453,
  },
];

function Dashboard() {
  const [data, setData] = useState<dataDashboard[]>(data_chat); // Usamos la interfaz ReporteTrabajo para tipar los datos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [rowsPerPage] = useState(5); // Filas por página
  const [loading, setLoading] = useState(false);

  // Llamada al backend para obtener datos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AXIOS.get(`/kiosks?page=${currentPage}`);
        setData(response.data); // Llenamos la tabla con los datos
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Manejar cambio de página
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 pr-6 pl-4 px-4 sm:px-6 sm:pl-6 lg:px-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center text-[#1E3A8A]">
        Dashboard
      </h1>
      <div className="w-full max-w-4xl">
        <table className="min-w-full bg-white border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-400 text-center text-sm font-medium text-[#1E3A8A]">
                KioskID
              </th>
              <th className="px-4 py-2 border border-gray-400 text-center text-sm font-medium text-[#1E3A8A]">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-400 text-center text-sm font-medium text-[#1E3A8A]">
                Technician
              </th>
              <th className="px-4 py-2 border border-gray-400 text-center text-sm font-medium text-[#1E3A8A]">
                Note
              </th>
              <th className="px-4 py-2 border border-gray-400 text-center text-sm font-medium text-[#1E3A8A]">
                Store ID
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Cargando datos...
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.KioskId}>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {row.KioskId}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {new Date(row.fecha).toLocaleDateString()}{" "}
                    {/* Formateamos la fecha */}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {row.name_tecnico}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {row.nota}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {row.store_Id}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-[#1E3A8A] text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            className="bg-[#1E3A8A] text-white px-4 py-2 rounded-md"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
