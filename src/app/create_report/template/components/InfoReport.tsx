import { type ReporteTrabajo } from "@/app/interfaces/Reporte_trabajo";
import { ChangeEvent } from "react";
import type { Sitios } from "@/app/interfaces/Sitios";
import moment from "moment";
import momentz from "moment-timezone";
momentz().tz("America/New_York").format();
interface Props {
  site: Sitios | null;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: {
    fecha: string;
  };
}

export default function InfoReport({ site, handleChange, values }: Props) {
  return (
    <div className="flex w-full justify-between pt-2">
      <div className="flex flex-col">
        <div>{site?.address}</div>
        <div>{site?.city}</div>
        <div className="flex flex-row w-full gap-2">
          <div>{site?.state}</div>
          <div>{site?.zip_code}</div>
        </div>
      </div>
      <div>
        <div>
          <span>Completation Date: </span>
          <input
            type="date"
            name="fecha"
            value={values.fecha}
            onChange={handleChange}
          />
        </div>
        <div>
          <span>Code: </span>{" "}
        </div>
      </div>
    </div>
  );
}
