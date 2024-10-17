import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("./dash"), {
  ssr: false,
});

export default function Page() {
  return <Dashboard />;
}
