import { Sitios } from "@/app/interfaces/Sitios";
import { ChangeEvent } from "react";

interface Props {
  site: Sitios | null;
  values: {
    field: string;
    KioskId: string;
    nota: string;
    name_tecnico: string;
    PictBOX?: File;
    PictBef?: File;
    PictDef?: File;
    PictAft?: File;
  };
  kiosks: number[];
  tecnicos: string[];
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

export default function InfoLine({
  handleChange,
  site,
  values,
  kiosks,
  tecnicos,
}: Props) {
  return (
    <div className="bg-blue-100 border text-[14px] border-black  p-2 w-full flex flex-col md:flex-row md:justify-between mt-2 ">
      <div className="flex flex-col  gap-5">
        <div className="flex  gap-2 items-center ">
          <span className="text-gray-500">Kiosk Number: </span>
          <input
            list="kioskOptions"
            name="KioskId"
            type="number"
            value={values.KioskId}
            onChange={(e) => handleChange(e)}
            className="bg-white rounded p-1"
            placeholder="Select or type Kiosk"
            required
          />
          <datalist id="kioskOptions">
            {kiosks.map((k) => (
              <option key={k} value={k.toString()} />
            ))}
          </datalist>
        </div>
        <div className="flex  gap-2 items-center ">
          <span className="text-gray-500">Store Number: </span>
          <div className="bg-white rounded p-1">{site?.store_id}</div>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="bg-white rounded p-1">{site?.ParentName}</div>
        {/* <div className="bg-white rounded p-1">{tienda}</div> */}
        <div className="flex gap-2 flex-row items-center">
          <span className="text-gray-500">Tech: </span>
          <select
            name="name_tecnico"
            value={values.name_tecnico}
            onChange={handleChange}
            className="bg-white rounded p-1"
            required
          >
            <option value="">Select Technician</option>
            {tecnicos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <select
          name="field"
          value={values.field}
          onChange={handleChange}
          className="bg-white rounded p-1"
        >
          <option value="">Select Field</option>
          <option value="Already Removed">Already Removed</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
}
