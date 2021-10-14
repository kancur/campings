export default function LocationHeading({ title }) {
  return (
    <div className="text-center">
      <p>Skvelé kempy v lokalite</p>
      <h1 className="text-5xl font-bold text-gray-600 p-3">
        {title}
      </h1>
    </div>
  );
}
