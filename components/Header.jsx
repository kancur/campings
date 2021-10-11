import Image from "next/image";

export default function Header(props) {
  return (
    <div className="bg-green-500 p-6 flex items-center justify-center flex-col gap-6">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl	text-gray-50 font-bold">Najkempy.sk</h1>
      </div>
      {props.children}
    </div>
  );
}
