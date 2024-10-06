"use client";
import React, { useState, useEffect } from "react";
import AXIOS from "../config/axios"; // Axios config
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface dataDashboard {
  KioskId: number;
  fecha: string;
  nota: string;
  name_tecnico: string;
  store_id: number;
  _id: string;
}

function Dashboard() {
  const [data, setData] = useState<dataDashboard[]>([]); // Usamos la interfaz ReporteTrabajo para tipar los datos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [rowsPerPage] = useState(5); // Filas por página
  const [loading, setLoading] = useState(false);

  // Llamada al backend para obtener datos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AXIOS.get(`/reportes`);
        console.log("response", response.data);
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

  const router = useRouter();
  const openReport = (url: string) => {
    router.push("/reporte/" + url);
  };
  const logout = () => {
    Cookies.remove("authToken");
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 pr-6 pl-4 px-4 sm:px-6 sm:pl-6 lg:px-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center text-[#1E3A8A]">
        Dashboard
      </h1>
      <div>
        <button
          onClick={() => router.push("/create_report")}
          className="bg-[#1E3A8A] text-white px-4 py-2 rounded-md"
        >
          New Report
        </button>
      </div>{" "}
      <div>
        <button
          onClick={logout}
          className="bg-[#ad1111] text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
      <div className="w-full max-w-4xl flex items-center flex-col justify-center p-2">
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
            {loading && !data ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Cargando datos...
                </td>
              </tr>
            ) : (
              (console.log(data),
              data.map((row) => (
                <tr
                  className="hover:bg-gray-200  cursor-pointer"
                  onClick={() => openReport(row._id)}
                  key={row.KioskId}
                >
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
                    {row.store_id}
                  </td>
                </tr>
              )))
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
