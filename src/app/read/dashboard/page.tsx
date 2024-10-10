"use client";
import React, {
  useState,
  useEffect,
  EventHandler,
  MouseEventHandler,
} from "react";
import AXIOS from "@/app/config/axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import NewYorkClock from "./mi-reloj/reloj";
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
        item?.store_id?.toString().includes(search) ||
        item?.fecha.includes(search)
      );
    });
    setFilteredData(filtered);
  }, [data, search]);

  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [toastRef, setToastRef] = useState<null | number | string>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ToastContainer />
      <div className="flex justify-between w-full items-center">
        <div>
          <img
            src="http://localhost:3000/redbox/coolsys.webp"
            className="w-[300px] h-[300px] object-contain"
          />
        </div>
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-800">
          RedBox Live Update
        </h1>
        <div>
          <NewYorkClock timeZone="America/New_York" />
        </div>
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
