"use client";
import { ReporteTrabajo } from "@interfaces/Reporte_trabajo";
import Header from "./components/Header";
import InfoReport from "./components/InfoReport";
import InfoLine from "./components/InfoLine";
import Note from "./components/Note";
import ImagesReport from "./components/Images";
import AXIOS from "@/app/config/axios";
import useGetKioskIds from "../hooks/useGetKioskIds";
import { useState } from "react";
import useGetOneSite from "../hooks/useGetOneSite";
import useCreateReport from "../hooks/useCreateReport";
import useGettecnicos from "../hooks/useGetTecnicos";
import { ToastContainer } from "react-toastify";

interface Props {
  reporte: {
    KioskId: string;
    fecha: string;
    PictBOX?: string;
    PictBef?: string;
    PictDef?: string;
    PictAft?: string;
    nota: string;
    name_tecnico: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    code: number;
    store_id: string;
    ParentName: string;
  };
}

export default function MainPrint({ reporteId }: { reporteId: string }) {
  const { kioskIds, loading } = useGetKioskIds();
  const { tecnicos, loading: loadTec } = useGettecnicos();
  const { values, handleChange, handleSubmit, setFieldValue } =
    useCreateReport();
  const { site, loading: loadingSite } = useGetOneSite(values.KioskId);
  return (
    <div className="grid w-full place-items-center bg-gray-500">
      <ToastContainer />
      <div className="p-2 bg-white w-[816px] md:px-5 m-4">
        <form onSubmit={handleSubmit}>
          <Header />
          <InfoReport handleChange={handleChange} site={site} />
          <InfoLine
            tecnicos={tecnicos}
            kiosks={kioskIds}
            handleChange={handleChange}
            site={site}
            values={values}
          />
          <Note handleChange={handleChange} note={values.nota} />
          <ImagesReport setFieldValue={setFieldValue} values={values} />
          <div className="w-full bg-black h-[1px]" />
          <div className="p-2  font-bold text-red-500">RED BOX</div>
          <button type="submit" className="bg-blue-500 p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
