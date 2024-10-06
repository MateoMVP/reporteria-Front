import { ReporteTrabajo } from "@interfaces/Reporte_trabajo";
import Header from "./components/Header";
import InfoReport from "./components/InfoReport";
import InfoLine from "./components/InfoLine";
import Note from "./components/Note";
import ImagesReport from "./components/Images";
import AXIOS from "@/app/config/axios";

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
  };
}

export default async function MainPrint({ reporteId }: { reporteId: string }) {
  try {
    const data = (
      await AXIOS.get<Props | { error: string }>("/reporte/" + reporteId)
    ).data;
    if ("reporte" in data) {
      const reporte = data.reporte;
      return (
        <div className="grid w-full place-items-center">
          <div className="p-2 bg-white w-[816px] h-[1056px] md:px-5 m-4">
            <div>
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
                KioskId={reporte.KioskId}
                ParentName="Wal-Mart Stores Inc"
                tienda="Walmart Neighborhood Market"
                store_id={reporte.store_id}
                tecnico={reporte.name_tecnico}
              />
              <Note note={reporte.nota} />
              <ImagesReport {...reporte} />
              <div className="w-full bg-black h-[1px]" />
              <div className="p-2  font-bold text-red-500">RED BOX</div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="text-red-500">{data.error}</div>;
  } catch (e) {
    return <div className="text-red-500">Error</div>;
  }
}
