export default function LocationHeading({ pretitle, title, subtitle }) {
  return (
    <div className="text-center p-5 bg-gray-100">
      {pretitle && <p className="text-xl text-gray-500">{pretitle}</p>}
      <h1 className="text-6xl font-bold text-gray-600 p-2">{title}</h1>
      {subtitle && <p className="text-gray-500">Okres {subtitle}</p>}
    </div>
  );
}
