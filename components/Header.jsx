import Image from "next/image";
import Button from "./building_blocks/Button";

export default function Header(props) {
  return (
    <div className="bg-brand p-4">
      <div className="grid grid-cols-3 items-center gap-2">
        <div></div>
        <div className="flex justify-center">
          <h1 className="text-4xl	text-gray-50 font-bold">Najkempy.sk</h1>
        </div>
        <div className="flex justify-end">
        </div>
      </div>
      {props.children}
    </div>
  );
}
