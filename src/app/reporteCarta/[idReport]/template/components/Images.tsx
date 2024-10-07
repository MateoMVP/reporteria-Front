import customImageLoader from "@/app/controllers/imageLoader";

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
      <div className="w-[255px] h-[255px]">
        {PictAft && (
          <img
            className="w-[255px] h-[255px]"
            src={customImageLoader({ src: PictAft,local:true })}
            alt=""
          />
        )}
      </div>
      <div className="w-[255px] h-[255px]">
        {PictBOX && (
          <img
            className="w-[255px] h-[255px]"
            src={customImageLoader({ src: PictBOX ,local:true})}
            alt=""
          />
        )}
      </div>
      <div className="w-[255px] h-[255px]">
        {PictBef && (
          <img
            className="w-[255px] h-[255px]"
            src={customImageLoader({ src: PictBef ,local:true})}
            alt=""
          />
        )}
      </div>
      <div className="w-[255px] h-[255px]">
        {PictDef && (
          <img
            className="w-[255px] h-[255px]"
            src={customImageLoader({ src: PictDef,local:true })}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
