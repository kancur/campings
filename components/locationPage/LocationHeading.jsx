export default function LocationHeading({ pretitle, title, subtitle }) {
  return (
    <div className="text-center p-4 bg-gray-100 text-gray-500">
      {pretitle && <p className="text-lg">{pretitle}</p>}
      <h1 className="text-5xl font-bold text-gray-600 p-2">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
