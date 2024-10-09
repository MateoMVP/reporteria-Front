import { ChangeEvent, useEffect } from "react";

interface Props {
  KioskId: string | number;
  store_id: string | number;
  ParentName: string;
  values: {
    KioskId: string;
    nota: string;
    field: string;
    name_tecnico: string;
    PictBOX?: File | string | null;
    PictBef?: File | string | null;
    PictDef?: File | string | null;
    PictAft?: File | string | null;
  };
  onEdit: boolean;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  tecnicos: string[];
}

export default function InfoLine({
  KioskId,
  ParentName,
  store_id,
  onEdit,
  values,
  handleChange,
  tecnicos,
}: Props) {
  console.log("values", values.name_tecnico);
  useEffect(() => {}, [values.name_tecnico]);
  return (
    <div className="bg-blue-100 border text-[14px] border-black  p-2 w-full flex flex-col md:flex-row md:justify-between mt-2 ">
      <div className="flex flex-col  gap-5">
        <div className="flex  gap-2 items-center ">
          <span className="text-gray-500">Kiosk Number: </span>
          <div className="bg-white rounded p-1">{KioskId}</div>
        </div>
        <div className="flex  gap-2 items-center ">
          <span className="text-gray-500">Store Number: </span>
          <div className="bg-white rounded p-1">{store_id}</div>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="bg-white rounded p-1">{ParentName}</div>
        <div className="flex gap-2 flex-row items-center">
          <span className="text-gray-500">Tech: </span>
          {!onEdit ? (
            <div className="bg-white rounded p-1">{values.name_tecnico}</div>
          ) : (
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
          )}
        </div>
        <select
          name="field"
          value={values.field}
          onChange={handleChange}
          className="bg-white rounded p-1"
          disabled={!onEdit}
        >
          <option value="">Select Field</option>
          <option value="Already Removed">Already Removed</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
}
