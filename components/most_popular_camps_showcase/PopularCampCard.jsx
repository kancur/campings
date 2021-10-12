import Image from 'next/image';

export default function PopularCampCard({ campData }) {
  const { name, location, img } = campData;
  return (
    <section className="shadow-lg p-2 border-gray-100 border space-y-2">
      <div className="image-container">
        <Image src={`/media/${img}`} layout="fill" className="image" />
      </div>
      <h1 className="text-xl capitalize">{name}</h1>
      <p className="text-gray-500">{location}</p>
    </section>
  );
}
