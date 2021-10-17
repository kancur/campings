export default function LocationHeading({ pretitle, title }) {
  return (
    <div className="text-center">
      <p>{pretitle}</p>
      <h1 className="text-5xl font-bold text-gray-600 p-3">
        {title}
      </h1>
    </div>
  );
}
