const inputClass = 'rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 my-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'

export default function AddNewCampPage() {
  return (
    <div className="p-6">
      <form>
        <div className="max-w-md">
          <div className="relative">
            <label className="text-gray-700">
              Camp name
              <span className="text-red-500 required-dot">*</span>
              <input
                type="text"
                id="camp-name"
                className={inputClass}
                name="email"
                placeholder="The name of the camp"
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
