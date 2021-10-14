import PopularCampCard from './PopularCampCard';

const FAKE_DATA = [
  {
    name: 'trusalova ATC',
    location: 'Velka Fatra',
    img: 'trusalova.jpg',
  },
  {
    name: 'random kemp',
    location: 'Domasa',
    img: 'opatovce.jpg',
  },
];

export default function PopularCampsWrapper() {
  return (
    <div className="grid grid-cols-6 gap-4 px-5">
      {FAKE_DATA.map((campData, index) => (
        <PopularCampCard key={index} campData={campData} />
      ))}
    </div>
  );
}
