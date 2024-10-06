import MainPrint from "./template/MainPrint";

function Reportpdf({ params }: { params: { idReport: string } }) {
  // console.log(params);
  return (
    <div className="w-full">
      <MainPrint reporteId={params.idReport} />
    </div>
  );
}

export default Reportpdf;
