import customImageLoader from "@/app/controllers/imageLoader";
import { ReporteTrabajo } from "@/app/interfaces/Reporte_trabajo";

type Props = {
  PictBOX?: string | File | undefined | null;
  PictBef?: string | File | undefined | null;
  PictDef?: string | File | undefined | null;
  PictAft?: string | File | undefined | null;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any;
  onEdit: boolean;
};
export default function ImagesReport({
  PictAft,
  PictBOX,
  PictBef,
  PictDef,
  onEdit,
  setFieldValue,
}: Props) {
  console.log("PictAft", PictAft);
  return (
    <div className="grid grid-cols-2 w-full place-items-center gap-3 pb-4">
      <div className="w-[300px] h-[320px]">
        <input
          disabled={!onEdit}
          type="file"
          name="PictAft"
          onChange={(e) => {
            if (e.target.files) setFieldValue("PictAft", e.target.files[0]);
          }}
        />
        {PictAft && (
          <img
            className="w-[300px] h-[300px]"
            src={
              typeof PictAft === "string"
                ? customImageLoader({ src: PictAft })
                : URL.createObjectURL(PictAft)
            }
            alt=""
          />
        )}
      </div>
      <div className="w-[300px] h-[320px]">
        <input
          disabled={!onEdit}
          type="file"
          name="PictBOX"
          onChange={(e) => {
            if (e.target.files) setFieldValue("PictBOX", e.target.files[0]);
          }}
        />
        {PictBOX && (
          <img
            className="w-[300px] h-[300px]"
            src={
              typeof PictBOX === "string"
                ? customImageLoader({ src: PictBOX })
                : URL.createObjectURL(PictBOX)
            }
            alt=""
          />
        )}
      </div>
      <div className="w-[300px] h-[320px]">
        <input
          disabled={!onEdit}
          type="file"
          name="PictBef"
          onChange={(e) => {
            if (e.target.files) setFieldValue("PictBef", e.target.files[0]);
          }}
        />
        {PictBef && (
          <img
            className="w-[300px] h-[300px]"
            src={
              typeof PictBef === "string"
                ? customImageLoader({ src: PictBef })
                : URL.createObjectURL(PictBef)
            }
            alt=""
          />
        )}
      </div>
      <div className="w-[300px] h-[320px]">
        <input
          disabled={!onEdit}
          type="file"
          name="PictDef"
          onChange={(e) => {
            if (e.target.files) setFieldValue("PictDef", e.target.files[0]);
          }}
        />
        {PictDef && (
          <img
            className="w-[300px] h-[300px]"
            src={
              typeof PictDef === "string"
                ? customImageLoader({ src: PictDef })
                : URL.createObjectURL(PictDef)
            }
            alt=""
          />
        )}
      </div>
    </div>
  );
}
