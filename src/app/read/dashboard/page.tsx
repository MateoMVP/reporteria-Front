"use client";
import React, {
  useState,
  useEffect,
  EventHandler,
  MouseEventHandler,
} from "react";
import AXIOS from "@/app/config/axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";

interface DataDashboard {
  KioskId: number;
  fecha: string;
  nota: string;
  name_tecnico: string;
  store_id: number;
  address: string;
  _id: string;
}

function Dashboard() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<DataDashboard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [filteredData, setFilteredData] = useState<DataDashboard[]>([]);
  const [filterDate, setFilterDate] = useState("");

  const currentUsername = Cookies.get("username");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AXIOS.get(`/reportes/public`);
        console.log("response", response.data);
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error al cargar los datos.");
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.fecha).toISOString().split("T")[0];
      return filterDate ? itemDate === filterDate : true; // Filtrar por fecha si hay una fecha seleccionada
    });
    setFilteredData(filtered); // Actualizamos los datos filtrados
  }, [filterDate, data]); // Ejecutar el filtro cada vez que cambie la fecha o los datos

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        item?.KioskId.toString().includes(search) ||
        item?.name_tecnico
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item?.address
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item?.store_id?.toString().includes(search)
      );
    });
    setFilteredData(filtered);
  }, [data, search]);

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
    Cookies.remove("username");
    router.push("/");
  };
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [toastRef, setToastRef] = useState<null | number | string>(null);

  const printer = async (id: string, kiosk: string) => {
    const toastId = toast.info("In process...", { autoClose: false });

    try {
      // Asegúrate de que la URL esté apuntando al servidor backend (3005)
      const baseUrl = AXIOS.defaults.baseURL;
      const fileURL = `${baseUrl}/reportes/pdf/${id}`;

      // Crear un enlace temporal para forzar la descarga
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `report_${kiosk}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.update(toastId, {
        render: "Success.",
        autoClose: 3000,
      });
    } catch (error: any) {
      console.error("Error al generar el reporte:", error);
      toast.update(toastId, {
        render: "Error.",
        autoClose: 5000,
      });
    } finally {
      setDownloadProgress(null);
    }
  };
  const printerAll = async () => {
    if (!minDate || !maxDate) {
      toast.error("Please select both dates", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const toastId = toast.info("In process...", { autoClose: false });
    try {
      const response = await AXIOS.get(
        `/reportes/pdf?minDate=${minDate}&maxDate=${maxDate}`,
        {
          responseType: "blob",
        }
      );
      // Crear una URL para el blob recibido
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Crear un elemento de enlace temporal
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reportes.zip"); // Nombre del archivo a descargar
      // Agregar el enlace al DOM y hacer clic en él
      document.body.appendChild(link);
      link.click();
      // Limpiar
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      // Limpiar los inputs de fechas
      setMinDate("");
      setMaxDate("");
      toast.update(toastId, {
        render: "Success.",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      toast.update(toastId, {
        render: "Error",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-800">
        Dashboard
      </h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="mb-2 sm:mb-0 bg-gray-100 text-gray-800 px-4 py-2 rounded-md shadow-md transition duration-200"
        />
      </div>
      <div className="grid grid-flow-col gap-2 place-items-center">
        <div className="grid gap-2 grid-flow-col place-items-center ">
          <label className="text-gray-700">Search: </label>
          <input
            type="search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            className="border border-black rounded p-2 my-2"
          />
        </div>
        Total: {filteredData.length}
      </div>
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Kiosk ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Crew
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Store ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    <svg
                      className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span className="mt-2 block">Cargando datos...</span>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    NO DATA
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => (
                  <tr
                    key={row.KioskId}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.KioskId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.name_tecnico}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {row.store_id}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
        {/* Descomentar si deseas usar la paginación */}
        {/* 
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            } transition duration-200`}
          >
            Anterior
          </button>
          <span className="text-gray-700">Página {currentPage}</span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200"
          >
            Siguiente
          </button>
        </div>
        */}
      </div>
    </div>
  );
}

export default Dashboard;