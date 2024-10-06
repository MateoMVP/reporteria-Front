import customImageLoader from "@/app/controllers/imageLoader";
import { ReporteTrabajo } from "@/app/interfaces/Reporte_trabajo";

type Props = {
  values: {
    PictAft?: File;
    PictBOX?: File;
    PictBef?: File;
    PictDef?: File;
  };
  setFieldValue: (field: string, value: any) => void;
};
export default function ImagesReport({ values, setFieldValue }: Props) {
  return (
    <div className="grid grid-cols-2 w-full place-items-center gap-3 pb-4">
      <div className=" bg-gray-300 w-[300px] h-[320px]">
        <input
          accept="image/*"
          type="file"
          name=""
          id=""
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFieldValue("PictAft", file);
            }
          }}
        />
        {values?.PictAft && (
          <img
            className="w-[300px] h-[300px]"
            src={URL.createObjectURL(values.PictAft)}
            alt=""
          />
        )}
      </div>
      <div className=" bg-gray-300 w-[300px] h-[320px]">
        <input
          accept="image/*"
          type="file"
          name=""
          id=""
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFieldValue("PictBOX", file);
            }
          }}
        />
        {values?.PictBOX && (
          <img
            className="w-[300px] h-[300px]"
            src={URL.createObjectURL(values.PictBOX)}
            alt=""
          />
        )}
      </div>
      <div className=" bg-gray-300 w-[300px] h-[320px]">
        <input
          accept="image/*"
          type="file"
          name=""
          id=""
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFieldValue("PictBef", file);
            }
          }}
        />
        {values?.PictBef && (
          <img
            className="w-[300px] h-[300px]"
            src={URL.createObjectURL(values.PictBef)}
            alt=""
          />
        )}
      </div>
      <div className=" bg-gray-300 w-[300px] h-[320px]">
        <input
          accept="image/*"
          type="file"
          name=""
          id=""
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFieldValue("PictDef", file);
            }
          }}
        />
        {values?.PictDef && (
          <img
            className="w-[300px] h-[300px]"
            src={URL.createObjectURL(values.PictDef)}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
