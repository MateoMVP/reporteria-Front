interface Props {
  KioskId: string | number;
  store_id: string | number;
  ParentName: string;
  tienda?: string;
  tecnico: string;
}

export default function InfoLine({
  KioskId,
  ParentName,
  store_id,
  tecnico,
  tienda,
}: Props) {
  return (
    <div className="bg-blue-100 border text-[14px] border-black  p-2 w-full flex justify-between mt-2 ">
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
        <div className="bg-white rounded p-1">{tienda}</div>
        <div className="flex gap-2 flex-row items-center">
          <span className="text-gray-500">Tech: </span>
          <div className="bg-white rounded p-1">{tienda}</div>
        </div>
      </div>
    </div>
  );
}
