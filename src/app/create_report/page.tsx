import MainPrint from "./template/MainPrint";

function CreateReport({ params }: { params: { idReport: string } }) {
  // console.log(params);
  return (
    <div className="w-full">
      <MainPrint reporteId={params.idReport} />
    </div>
  );
}

export default CreateReport;
