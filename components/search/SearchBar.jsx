import { IoSearch } from "react-icons/io5";
import LocationPicker from "./LocationPicker/LocationPicker";

export default function SearchBar(props) {
  return (
    <div className="flex px-5 py-3 bg-gray-50	rounded-3xl gap-4 justify-between w-searchBar">
      <LocationPicker />
      {/* <TypePicker /> */}
      <SearchButton />
    </div>
  );
}

function SearchButton() {
  return (
    <button className="bg-yellow-500 rounded-2xl p-3 text-gray-50 font-semibold flex items-center gap-1">
      <IoSearch />
      Hľadať
    </button>
  );
}
