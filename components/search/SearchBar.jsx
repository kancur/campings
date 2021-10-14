import { IoSearch } from "react-icons/io5";
import LocationPicker from "./LocationPicker/LocationPicker";
import Router from 'next/router'


const handleSubmit = (e) => {
  e.preventDefault()
  console.log('form submitted')
  Router.push('/search')
}

export default function SearchBar(props) {
  return (
    <form onSubmit={handleSubmit} className="flex px-5 py-3 bg-gray-50	rounded-3xl gap-4 justify-between w-searchBar">
      <LocationPicker />
      {/* <TypePicker /> */}
      <SearchButton />
    </form>
  );
}

function SearchButton() {
  return (
    <button type="submit" className="bg-gray-500 rounded-2xl p-3 text-gray-50 font-semibold flex items-center gap-1 focus:ring focus:ring-blue-400 focus:outline-none">
      <IoSearch />
      Hľadať
    </button>
  );
}
