import { type ReporteTrabajo } from "@/app/interfaces/Reporte_trabajo";

interface Props {
  address: string;
  city: string;
  state: string;
  zip: string;
  fecha: string;
  code: number;
}

export default function InfoReport({
  address,
  code,
  fecha,
  city,
  state,
  zip,
}: Props) {
  return (
    <div className="flex w-full justify-between pt-2">
      <div className="flex flex-col">
        <div>{address}</div>
        <div>{city}</div>
        <div className="flex flex-row w-full gap-2">
          <div>{state}</div>
          <div>{zip}</div>
        </div>
      </div>
      <div>
        <div>
          <span>Completation Date: </span>
          {fecha.toString()}
        </div>
        <div>
          <span>Code: </span> {" " + code}
        </div>
      </div>
    </div>
  );
}
