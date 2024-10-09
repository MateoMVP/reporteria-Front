export default function Header() {
  return (
    <header className="w-full  flex flex-col md:flex-row md:justify-between  items-center">
      <div className="text-[32px] text-center ">Report RED BOX</div>
      <img
        src="/coolsys.webp"
        className="w-[210px] h-[210px] object-contain"
        alt="logo 1"
      />
    </header>
  );
}
