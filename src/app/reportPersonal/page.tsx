"use client";
import React, { useState, useEffect } from "react";
import AXIOS from "../config/axios"; // Axios config
import { useRouter } from "next/navigation"; // Para manejar la navegación
import { Bounce, ToastContainer, toast } from "react-toastify";

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
interface reportesPerTecnico{
    [name_tecnico: string]: InfoReporte[];
}

// const data_chat: InfoReporte[] = [
//     {
//         _id: "8e4ee6be-bd6b-4db0-93a5-0a35f594c09e",
//         KioskId: 74473,
//         fecha: "2022-05-19",
//         address: "67807 Pamela Forest",
//         city: "Millston",
//         state: "CT",
//         zipCode: "85283",
//         name_tecnico: "Erica Rodriguez",
//     },
//     {
//         _id: "8e4ee6be-bd6b-4db0-93a5-0a35f594c09e",
//         KioskId: 74473,
//         fecha: "2022-05-19",
//         address: "67807 Pamela Forest",
//         city: "Millston",
//         state: "CT",
//         zipCode: "85283",
//         name_tecnico: "Mateo Velasquez",
//       },
//       {
//         _id: "8e4ee6be-bd6b-4db0-93a5-0a35f594c09e",
//         KioskId: 74473,
//         fecha: "2022-05-19",
//         address: "67807 Pamela Forest",
//         city: "Millston",
//         state: "CT",
//         zipCode: "85283",
//         name_tecnico: "Mateo Velasquez",
//       },
//       {
//         _id: "8e4ee6be-bd6b-4db0-93a5-0a35f594c09e",
//         KioskId: 74473,
//         fecha: "2022-05-19",
//         address: "67807 Pamela Forest",
//         city: "Millston",
//         state: "CT",
//         zipCode: "85283",
//         name_tecnico: "Johan Gonzales",
//       },
//       {
//         _id: "8e4ee6be-bd6b-4db0-93a5-0a35f594c09e",
//         KioskId: 74473,
//         fecha: "2022-05-19",
//         address: "67807 Pamela Forest",
//         city: "Millston",
//         state: "CT",
//         zipCode: "85283",
//         name_tecnico: "Erica Rodriguez",
//       },
// ]


function ReportesTecnico() {
  const [reportes, setReportes] = useState<InfoReporte[]>([]); // Datos de los reportes
  const [loading, setLoading] = useState(false);
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

  // Agrupar reportes por técnico
  const reportesPorTecnico = reportes.reduce((acc: reportesPerTecnico, reporte) => {
    acc[reporte.name_tecnico] = acc[reporte.name_tecnico] || [];
    acc[reporte.name_tecnico].push(reporte);
    return acc;
  }, {} as reportesPerTecnico);

  // Función para manejar el clic en cada fila
  const handleRowClick = (_id: string) => {
    router.push(`/reporte/${_id}`); // Redirigir a la vista de reporte específico
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Reportes por Técnico
      </h1>
      <div className="w-full max-w-6xl overflow-x-auto"> 
        {loading ? (
          <div className="text-center">Cargando datos...</div>
        ) : (
          Object.keys(reportesPorTecnico).map((tecnico) => (
            <div key={tecnico} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                {tecnico}
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
                      Dirección
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Ciudad
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Estado
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center text-sm sm:text-base font-medium text-gray-700">
                      Código Postal
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
                        {new Date(reporte.fecha).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.KioskId}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.address}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.city}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.state}
                      </td>
                      <td className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-400 text-center">
                        {reporte.zipCode}
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
