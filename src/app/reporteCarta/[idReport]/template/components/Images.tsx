import { ReporteTrabajo } from "@/app/interfaces/Reporte_trabajo";

type Props = {
  PictBOX?: string;
  PictBef?: string;
  PictDef?: string;
  PictAft?: string;
};
export default function ImagesReport({
  PictAft,
  PictBOX,
  PictBef,
  PictDef,
}: Props) {
  return (
    <div className="grid grid-cols-2 w-full place-items-center gap-3 pb-4">
      <div className="w-[300px] h-[300px]">
        {PictAft && (
          <img className="w-[300px] h-[300px]" src={PictAft} alt="" />
        )}
      </div>
      <div className="w-[300px] h-[300px]">
        {PictBOX && (
          <img className="w-[300px] h-[300px]" src={PictBOX} alt="" />
        )}
      </div>
      <div className="w-[300px] h-[300px]">
        {PictBef && (
          <img className="w-[300px] h-[300px]" src={PictBef} alt="" />
        )}
      </div>
      <div className="w-[300px] h-[300px]">
        {PictDef && (
          <img className="w-[300px] h-[300px]" src={PictDef} alt="" />
        )}
      </div>
    </div>
  );
}
