import MainPrint from "./template/MainPrint";

const data = {
  KioskId: "KioskId",
  fecha: new Date().toISOString().split("T")[0],
  PictBOX: "https://via.placeholder.com/450",
  PictBef: "https://via.placeholder.com/450",
  PictDef: "https://via.placeholder.com/450",
  PictAft: "https://via.placeholder.com/450",
  nota: "nota de pruebas para el reporte",
  name_tecnico: "YACKEY DEGDE",
  address: "955 S Woodland Blvd",
  city: "LOS ANGELES",
  state: "LA",
  zip: "12345",
  code: 123,
  store_id: "123124",
};
function Reportpdf({ params }: { params: { idReport: string } }) {
  // console.log(params);
  return (
    <div className="w-full">
      <MainPrint reporte={data} />
    </div>
  );
}

export default Reportpdf;
