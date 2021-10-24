import ImageDropzone from './ImageDropzone';

const inputClass =
  'rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 my-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent';

export default function AddNewCampPage() {
  return (
    <div className="p-6">
      <form className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow border border-gray-200" autoComplete="off">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700">
            Camp name
            <span className="text-red-500 required-dot">*</span>
            <input
              type="text"
              id="camp-name"
              name="camp-name"
              className={inputClass}
              placeholder="The name of the camp"
            />
          </label>

          <label className="text-gray-700">
            Slug
            <span className="text-red-500 required-dot">*</span>
            <input
              type="text"
              id="camp-name"
              name="camp-name"
              className={inputClass}
              placeholder="atc-horna-marikova"
            />
          </label>

          <label className="text-gray-700">
            Lat, lon
            <span className="text-red-500 required-dot">*</span>
            <input
              type="text"
              id="camp-name"
              name="camp-name"
              className={inputClass}
              placeholder="49.140164025449074, 19.05241555840758"
            />
          </label>

        
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700">
            Short description
            <input
              type="text"
              id="short-description"
              name="short-description"
              className={inputClass}
              placeholder="Nádherný kemp na úpätí Malej Fatry"
            />
          </label>

          <label className="text-gray-700">
            Description
            <textarea
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
  );
}
