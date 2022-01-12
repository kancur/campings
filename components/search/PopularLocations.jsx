export default function PopularLocations() {
  return (
    <div>
      <ul className="flex gap-4">
        {LOCATIONS.map((location) => (
          <li>{location.name}</li>
        ))}
      </ul>
    </div>
  );
}
