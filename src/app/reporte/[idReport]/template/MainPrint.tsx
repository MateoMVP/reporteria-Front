"use client";

import { useEffect, useState } from "react";
import { ReporteTrabajo } from "@interfaces/Reporte_trabajo";
import Header from "./components/Header";
import InfoReport from "./components/InfoReport";
import InfoLine from "./components/InfoLine";
import Note from "./components/Note";
import ImagesReport from "./components/Images";
import AXIOS from "@/app/config/axios";
import useModifyReport from "@/app/create_report/hooks/useModifyReport";
import useGettecnicos from "@/app/create_report/hooks/useGetTecnicos";

interface ReporteProps {
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
}

interface ApiResponse {
  reporte?: ReporteProps;
  error?: string;
}

interface MainPrintProps {
  reporteId: string;
}

const MainPrint: React.FC<MainPrintProps> = ({ reporteId }) => {
  const [reporte, setReporte] = useState<ReporteProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [tecnico, setTecnico] = useState<string>("");
  console.log(onEdit);
  const { handleChange, handleSubmit, setFieldValue, values } = useModifyReport(
    reporteId,
    tecnico
  );
  const { tecnicos } = useGettecnicos();
  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await AXIOS.get<ApiResponse>(`/reporte/${reporteId}`);
        const data = response.data;
        if (data.reporte) {
          setFieldValue("KioskId", data.reporte.KioskId);
          setFieldValue("nota", data.reporte.nota);
          setFieldValue("name_tecnico", data.reporte.name_tecnico);
          if (data.reporte.PictBOX)
            setFieldValue("PictBOX", data.reporte.PictBOX);
          if (data.reporte.PictBef)
            setFieldValue("PictBef", data.reporte.PictBef);
          if (data.reporte.PictDef)
            setFieldValue("PictDef", data.reporte.PictDef);
          if (data.reporte.PictAft)
            setFieldValue("PictAft", data.reporte.PictAft);

          setReporte(data.reporte);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("Datos no válidos recibidos.");
        }
      } catch (err) {
        setError("Error al obtener el reporte.");
      } finally {
        setLoading(false);
      }
    };

    fetchReporte();
  }, [reporteId]);

  if (loading) {
    return <div className="text-gray-500">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (reporte) {
    return (
      <div className="grid w-full place-items-center bg-gray-500">
        <div className="p-2 bg-white w-[816px] md:px-5 m-4">
          <form onSubmit={() => handleSubmit()}>
            <Header />
            <InfoReport
              zip={reporte.zip}
              state={reporte.state}
              city={reporte.city}
              address={reporte.address}
              code={reporte.code}
              fecha={reporte.fecha}
            />
            <InfoLine
              tecnicos={tecnicos}
              KioskId={reporte.KioskId}
              ParentName="Wal-Mart Stores Inc"
              store_id={reporte.store_id}
              handleChange={handleChange}
              values={values}
              onEdit={onEdit}
            />
            <Note note={reporte.nota} />
            <ImagesReport
              onEdit={onEdit}
              PictAft={values.PictAft}
              PictBOX={values.PictBOX}
              PictBef={values.PictBef}
              PictDef={values.PictDef}
              setFieldValue={setFieldValue}
            />
            <div className="w-full bg-black h-[1px]" />
            <div className="p-2 font-bold text-red-500">RED BOX</div>
            <div className="flex gap-3">
              <button
                className="p-2 rounded disabled:bg-gray-500 bg-blue-400 hover:bg-blue-600"
                disabled={!onEdit}
                type="submit"
              >
                Save
              </button>
              <button
                className="p-2 rounded disabled:bg-gray-500 bg-orange-400 hover:bg-blue-600"
                disabled={onEdit}
                onClick={() => setOnEdit(true)}
                type="button"
              >
                Edit
              </button>
              <button
                className="p-2 rounded disabled:bg-gray-500 bg-red-400 hover:bg-blue-600"
                type="button"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default MainPrint;