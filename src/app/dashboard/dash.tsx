"use client";
import React, {
  useState,
  useEffect,
  EventHandler,
  MouseEventHandler,
} from "react";
import AXIOS from "../config/axios"; // Axios config
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { AxiosError } from "axios";

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
        const response = await AXIOS.get<
          {
            KioskId: number;
            fecha: string;
            nota: string;
            name_tecnico: string;
            store_id: number;
            address: string;
            _id: string;
          }[]
        >(`/reportes`);
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error al cargar los datos.");
      }
    };

    fetchData();
  }, []);

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
  const [sort, setSort] = useState<"asc" | "desc">("asc");
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
      if (error instanceof AxiosError) {
        toast.update(toastId, {
          render: "Error: " + error.response?.data,
          autoClose: 5000,
          type: "error",
        });
      } else if (error instanceof Error) {
        toast.update(toastId, {
          render: "Error: " + error.message,
          autoClose: 5000,
          type: "error",
        });
      }
    }
  };
  const donwloadExcelBuffer = async () => {
    // if (!minDate || !maxDate) {
    //   toast.error("Please select both dates", {
    //     position: "top-right",
    //     autoClose: 3000,
    //   });
    //   return;
    // }
    const toastId = toast.info("In process...", { autoClose: false });
    try {
      const response = await AXIOS.get(
        `/reportes/excel`,
        // `/reportes/excel?minDate=${minDate}&maxDate=${maxDate}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reportes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      setMinDate("");
      setMaxDate("");
      toast.update(toastId, {
        render: "Success.",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      if (error instanceof AxiosError) {
        toast.update(toastId, {
          render: "Error: " + error.response?.data,
          autoClose: 5000,
          type: "error",
        });
      } else if (error instanceof Error) {
        toast.update(toastId, {
          render: "Error: " + error.message,
          autoClose: 5000,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-800">
        Dashboard
      </h1>
      <div className="flex flex-col md:flex-col lg:flex-row items-center  sm:space-x-4 mb-6">
        <button
          onClick={() => router.push("/create_report")}
          className="mb-2 sm:mb-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md shadow-md transition duration-200 flex items-center justify-center"
        >
          New Report
        </button>
        {currentUsername === "EdwinR" && (
          <button
            onClick={() => router.push("/create_user")}
            className="mb-2 sm:mb-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md shadow-md transition duration-200 flex items-center justify-center"
          >
            Create User
          </button>
        )}
        {currentUsername === "EdwinR" && (
          <button
            onClick={() => router.push("/reportPersonal")}
            className="mb-2 sm:mb-0 bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-md shadow-md transition duration-200 flex items-center justify-center"
          >
            Personal
          </button>
        )}
        <div className="grid place-items-center">
          <label className="text-gray-700 font-bold">Filter by date: </label>
          <input
            id="dateFILTER"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mb-2 sm:mb-0 bg-gray-100 text-gray-800 px-4 py-2 rounded-md shadow-md transition duration-200"
          />
        </div>
        {currentUsername === "EdwinR" && (
          <div className="flex flex-col sm:flex-row sm:space-x-2 items-center border-l-2 pl-4 shadow-lg bg-white rounded-lg p-2">
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
            <div className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-md shadow-lg transition duration-200 flex items-center justify-center">
              <button
                type="button"
                onClick={printerAll}
                className="text-white-800 hover:text-white-900 flex items-center"
              >
                <FaPrint className="mr-1" /> PRINT
              </button>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md shadow-md transition duration-200 flex items-center justify-center"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col md:flex-col lg:flex-row items-center  sm:space-x-4 mb-6">
        <div className="grid  grid-flow-col gap-2 place-items-center">
          <div className="flex flex-row gap-2 items-center ">
            <label className="text-gray-700">Search: </label>
            <input
              type="search"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="border border-black rounded p-2 my-2"
            />
          </div>
          <div>Total: {filteredData.length}</div>
          <div
            className="hover:brightness-75 hover:filter hover:grayscale-100 cursor-pointer hover:scale-125  transition duration-200"
            onClick={() => {
              const url = new URL(window.location.href);
              url.pathname = "/redbox/read/dashboard";
              navigator.clipboard.writeText(
                JSON.stringify(url, null, 2).replace(/"/g, "")
              );
              toast.success("Data copied to clipboard.");
            }}
          >
            <img
              src="https://www.svgrepo.com/show/136572/copy.svg"
              className="w-[20px] h-[20px] object-contain"
            />
          </div>
        </div>
        {currentUsername === "cosas" && (
          <div>
            <button
              type="button"
              onClick={donwloadExcelBuffer}
              className="text-center p-2 bg-green-700 active:bg-green-300  hover:bg-green-600 rounded"
            >
              Download Excel
            </button>
          </div>
        )}
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
                <th className="px-6 py-3 text-center text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Action
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
                    key={row.KioskId + "-" + index}
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
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => openReport(row._id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2 flex items-center"
                      >
                        <FaEye className="mr-1" /> OPEN
                      </button>
                      {currentUsername === "EdwinR" && (
                        <button
                          onClick={() =>
                            printer(row._id, row.KioskId.toString())
                          }
                          className="text-yellow-600 hover:text-yellow-900 flex items-center"
                        >
                          <FaPrint className="mr-1" /> PRINT
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
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
