export default function Footer(props) {
  return (
    <div className="bg-gray-100 text-gray-500 text-sm p-4 flex items-center justify-center flex-col gap-6 z-40">
      najkempy.sk © {new Date().getFullYear()} 
    </div>
  );
}
