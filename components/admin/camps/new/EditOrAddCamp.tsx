import React, { useEffect, useState } from 'react';
import ButtonAdmin from '../../general/ButtonAdmin';
import CampPreview from './CampPreview';
import ImageDropzone from './ImageDropzone';
import { Input, inputClasses } from '../../../general/Input';
import { InputCoords } from './parts/InputCoords';
import toSlug from '../../../../helpers/toSlug';
import { InputSlug } from './parts/InputSlug';
import { FRONTEND_API_ROUTE } from '../../../../OPTIONS';
import { CampData } from '../../../../interfaces/baseInterfaces';

export default function EditOrAddCamp({ campDataFetched }: { campDataFetched: CampData }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [campData, setCampData] = useState<CampData>(undefined);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [saveState, setSaveState] = useState('idle');

  const upsertCampData = (data: {}) => {
    setCampData((prevData) => ({ ...prevData, ...data }));
  };

  useEffect(() => {
    if (fileToUpload) {
      upsertCampData({ featuredImage: fileToUpload });
    }
  }, [fileToUpload]);

  useEffect(() => {
    if (campDataFetched) {
      setCampData(campDataFetched);
      setIsEditMode(true);
    }
  }, [campDataFetched]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveState('saving');

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

    fetch(`${FRONTEND_API_ROUTE}/camping`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'saved') {
          setSaveState('saved');
          setTimeout(() => {
            setSaveState('idle');
          }, 2000);
        }
        return json;
      })
      .catch((error) => console.error(error));
  };

  const handleSlugInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    upsertCampData({ slug: value });
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    upsertCampData({ name: e.target.value });
  };

  const handleGetSlugClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    upsertCampData({ slug: toSlug(campData.name) });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {isEditMode ? (
        <h1 className="font-semibold text-2xl">
          Editing camp ID:{' '}
          <span className="font-mono font-normal text-pink-700">{campDataFetched._id}</span>
        </h1>
      ) : (
        <h1 className="font-semibold text-2xl">Add new campsite</h1>
      )}

      <div className="admin-main-wrapper">
        <form
          onSubmit={handleSave}
          id="camp-edit-form"
          autoComplete="off"
          className="flex flex-col md:grid md:grid-cols-2 gap-4"
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
                upsertCampData={upsertCampData}
                fetchedCoords={campDataFetched?.coords}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Short description
              <Input
                onInput={(e) => upsertCampData({ shortDescription: e.target.value })}
                type="text"
                id="shortDescription"
                name="shortDescription"
                placeholder="Nádherný kemp na úpätí Malej Fatry"
                value={campData?.shortDescription || ''}
              />
            </label>

            <label className="text-gray-700">
              Website
              <textarea
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  upsertCampData({ website: e.target.value })
                }
                rows={1}
                id="website"
                name="website"
                className={inputClasses}
                placeholder="https://example.com"
                value={campData?.website || ''}
              />
            </label>
            <p>Featured image</p>
            <ImageDropzone fileToUpload={fileToUpload} setFileToUpload={setFileToUpload} />
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
          className="w-32 h-10 bg-emerald-500 justify-self-end"
        >
          {saveState === 'idle' && 'Save camp'}
          {saveState === 'saving' && 'Saving ...'}
          {saveState === 'saved' && 'SAVED'}
        </ButtonAdmin>
      </div>
      <CampPreview camp={campData} previewImage={fileToUpload?.preview} />
    </div>
  );
}
