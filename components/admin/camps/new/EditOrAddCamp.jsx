import classNames from 'classnames';
import { useEffect, useState } from 'react';
import ButtonAdmin from '../../general/ButtonAdmin';
import CampPreview from './CampPreview';
import ImageDropzone from './ImageDropzone';
import { Input } from './Input';
import { InputCoords } from './parts/InputCoords';
import toSlug from '../../../../helpers/toSlug';
import { InputSlug } from './parts/InputSlug';
import { BACKEND_HOST } from '../../../../OPTIONS';
import axios from 'axios';

export const inputClasses = classNames(
  'rounded-lg',
  'flex-1',
  'appearance-none',
  'border',
  'border-gray-200',
  'w-full',
  'py-2',
  'my-1',
  'px-4',
  'bg-white',
  'text-gray-700',
  'placeholder-gray-300',
  'shadow',
  'text-base',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-400',
  'focus:border-transparent',
  'disabled:bg-gray-100'
);

export default function EditOrAddCamp({ campDataFetched }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [campData, setCampData] = useState({});
  const [fileToUpload, setFileToUpload] = useState();

  const mergeCampData = (data) => {
    setCampData((prevData) => ({ ...prevData, ...data }));
  };

  useEffect(() => {
    console.log(campData);
  }, [campData]);

  useEffect(() => {
    if (fileToUpload) {
      mergeCampData({ featuredImage: fileToUpload });
    }
  }, [fileToUpload]);

  useEffect(() => {
    if (campDataFetched) {
      setCampData(campDataFetched);
      setIsEditMode(true);
    }
  }, [campDataFetched]);

  const handleSave = async (e) => {
    console.log('saving');
    e.preventDefault();
    
    const payload = {
      name: campData.name,
      slug: campData.slug,
      coords: campData.coords,
      short_description: campData.shortDescription,
    };

    if (campData._id) {
      payload['_id'] = campData._id;
    }

    const formData = new FormData();
    formData.append('slug', campData.slug);
    formData.append('payload', JSON.stringify(payload));
    formData.append('featured_image', campData.featuredImage);

    fetch(`${BACKEND_HOST}/api/camping`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.log(error));
  };

  const handleSlugInput = (value) => {
    mergeCampData({ slug: value });
  };

  const handleNameInput = (e) => {
    mergeCampData({ name: e.target.value });
  };

  const handleGetSlugClick = (e) => {
    mergeCampData({ slug: toSlug(campData.name) });
  };

  const mergeCoords = (coords) => {
    mergeCampData({ coords });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {isEditMode ? (
        <h1 className="font-semibold text-2xl">
          Editing camp ID:{' '}
          <span className="font-mono font-normal text-pink-700">
            {campDataFetched._id}
          </span>
        </h1>
      ) : (
        <h1 className="font-semibold text-2xl">Add new campsite</h1>
      )}

      <div className="admin-main-wrapper">
        <form
          onSubmit={handleSave}
          id="camp-edit-form"
          autoComplete="off"
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Camp name
              <span className="text-red-500 required-dot">*</span>
              <Input
                onInput={handleNameInput}
                type="text"
                id="name"
                name="name"
                required
                minLength={3}
                maxLength={60}
                className={inputClasses}
                placeholder="The name of the camp"
                value={campData?.name || ''}
                valid={campData?.name?.length > 3}
              />
            </label>

            <InputSlug
              handleGetSlugClick={handleGetSlugClick}
              fetchedSlug={campDataFetched?.slug}
              handleSlugInput={handleSlugInput}
              slug={campData?.slug}
              isEditMode={isEditMode}
            />

            <label className="text-gray-700">
              Lat, lon
              <span className="text-red-500 required-dot">*</span>
              <InputCoords
                mergeCoords={mergeCoords}
                fetchedCoords={campDataFetched?.coords}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Short description
              <Input
                onInput={(e) =>
                  mergeCampData({ shortDescription: e.target.value })
                }
                type="text"
                id="shortDescription"
                name="shortDescription"
                className={inputClasses}
                placeholder="Nádherný kemp na úpätí Malej Fatry"
                value={campData.shortDescription || ''}
              />
            </label>

            <label className="text-gray-700">
              Website
              <textarea
                onInput={(e) => mergeCampData({ website: e.target.value })}
                rows={1}
                type="text"
                id="website"
                name="website"
                className={inputClasses}
                placeholder="https://example.com"
                value={campData.website || ''}
              />
            </label>
            <p>Featured image</p>
            <ImageDropzone
              fileToUpload={fileToUpload}
              setFileToUpload={setFileToUpload}
            />
          </div>
        </form>
      </div>
      <div className="flex justify-end gap-2">
        <ButtonAdmin type="button" className="bg-red-500 w-32 h-10">
          Delete camp
        </ButtonAdmin>
        <ButtonAdmin
          type="submit"
          form="camp-edit-form"
          className="w-32 h-10 bg-green-500 justify-self-end"
        >
          Save camp
        </ButtonAdmin>
      </div>
      <CampPreview camp={campData} previewImage={fileToUpload?.preview} />
    </div>
  );
}
