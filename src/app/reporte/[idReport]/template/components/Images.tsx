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
      <div className="w-[300px] h-[330px]">
        <div className="flex gap-2 text-[12px]">
          <div className="font-bold">Front Store</div>
          <input
            disabled={!onEdit}
            type="file"
            name="PictAft"
            onChange={(e) => {
              if (e.target.files) setFieldValue("PictAft", e.target.files[0]);
            }}
          />
        </div>
        {PictAft && (
          <img
            className="w-[300px] h-[300px] object-center"
            src={
              typeof PictAft === "string"
                ? customImageLoader({ src: PictAft })
                : URL.createObjectURL(PictAft)
            }
            alt=""
          />
        )}
      </div>
      <div className="w-[300px] h-[330px]">
        <div className="flex gap-2 text-[12px]">
          <div className="font-bold">Equipment</div>
          <input
            disabled={!onEdit}
            type="file"
            name="PictBOX"
            onChange={(e) => {
              if (e.target.files) setFieldValue("PictBOX", e.target.files[0]);
            }}
          />
        </div>
        {PictBOX && (
          <img
            className="w-[300px] h-[300px] object-center"
            src={
              typeof PictBOX === "string"
                ? customImageLoader({ src: PictBOX })
                : URL.createObjectURL(PictBOX)
            }
            alt=""
          />
        )}
      </div>
      <div className="w-[300px] h-[330px]">
        <div className="flex gap-2 text-[12px]">
          <div className="font-bold ">Connections</div>
          <input
            disabled={!onEdit}
            type="file"
            name="PictBef"
            onChange={(e) => {
              if (e.target.files) setFieldValue("PictBef", e.target.files[0]);
            }}
          />
        </div>
        {PictBef && (
          <img
            className="w-[300px] h-[300px] object-center"
            src={
              typeof PictBef === "string"
                ? customImageLoader({ src: PictBef })
                : URL.createObjectURL(PictBef)
            }
            alt=""
          />
        )}
      </div>
      <div className="w-[300px] h-[330px]">
        <div className="flex gap-2 text-[12px]">
          <div className="font-bold">Disconnected</div>
          <input
            disabled={!onEdit}
            type="file"
            name="PictDef"
            onChange={(e) => {
              if (e.target.files) setFieldValue("PictDef", e.target.files[0]);
            }}
          />
        </div>
        {PictDef && (
          <img
            className="w-[300px] h-[300px] object-center"
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
