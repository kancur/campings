import { useEffect, useState } from 'react';
import ButtonAdmin from '../general/ButtonAdmin';
import CampPreview from './CampPreview';
import ImageDropzone from './ImageDropzone';

const inputClass =
  'rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 my-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent';

export default function AddNewCampPage() {
  const [campData, setCampData] = useState({});
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [coords, setCoords] = useState({});

  const handleNameInput = (e) => {
    setName(e.target.value);
    setSlug(automaticSlugGenerator(e.target.value));
  };

  const handleCoordsInput = (e) => {
    const raw = e.target.value;
    const removedWhitespace = raw.replace(/\s/g, '');
    const coordsArray = removedWhitespace.split(',');
    const [lat, lon] = coordsArray;
    setCoords({ lat, lon });
  };

  const handleInput = (e) => {
    setCampData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(campData);
  }, [campData]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="admin-main-wrapper">
        <form autoComplete="off" className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Camp name
              <span className="text-red-500 required-dot">*</span>
              <input
                onInput={handleNameInput}
                type="text"
                id="name"
                name="name"
                maxLength={60}
                className={inputClass}
                placeholder="The name of the camp"
                value={name}
              />
            </label>

            <label className="text-gray-700">
              Slug
              <span className="text-red-500 required-dot">*</span>
              <input
                onInput={(e) => setSlug(e.value)}
                type="text"
                id="slug"
                name="slug"
                maxLength={90}
                className={inputClass}
                placeholder="atc-horna-marikova"
                value={slug}
              />
            </label>

            <label className="text-gray-700">
              Lat, lon
              <span className="text-red-500 required-dot">*</span>
              <input
                onInput={handleCoordsInput}
                type="text"
                id="coords"
                name="coords"
                className={inputClass}
                placeholder="49.140164025449074, 19.05241555840758"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Short description
              <input
                onInput={handleInput}
                type="text"
                id="shortDescription"
                name="shortDescription"
                className={inputClass}
                placeholder="Nádherný kemp na úpätí Malej Fatry"
              />
            </label>

            <label className="text-gray-700">
              Description
              <textarea
                onInput={handleInput}
                rows={1}
                type="text"
                id="description"
                name="description"
                className={inputClass}
                placeholder="Description"
              />
            </label>
            <p>Featured image</p>
            <ImageDropzone />
          </div>
        </form>
      </div>
      <ButtonAdmin className="w-32 h-10 ml-auto bg-green-500 justify-self-end">
        Save camp
      </ButtonAdmin>
      <CampPreview camp={campData} />
    </div>
  );
}

function automaticSlugGenerator(name) {
  const slug = name.split(' ').join('-');
  return slug;
}
