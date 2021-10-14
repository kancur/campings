const LOCATIONS = [
  {
    name: "Vysoke Tatry",
    id: 234346252
  },
  {
    name: "kremnicke vrchy",
    id: 234346252
  },
  {
    name: "Orava",
    id: 234346252
  },
]

export default function PopularLocations() {
  return (
    <div>
      <ul className="flex gap-4">
        {LOCATIONS.map((location) => (
          <li>{location.name}</li>
        ))}
      </ul>
    </div>
  )
}