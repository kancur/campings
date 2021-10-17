import LocationPicker from "./LocationPicker/LocationPicker";
import Router from 'next/router'
import { SearchButton } from "./SearchButton";
import { useState } from "react";
import toSlug from "../../helpers/toSlug";

export default function SearchForm(props) {
  const [inputValue, setInputValue] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const slug = toSlug(inputValue)
    Router.push(`/${slug}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex px-5 py-3 bg-gray-50	rounded-3xl gap-4 justify-between max-w-searchBar">
      <LocationPicker setInputValue={setInputValue} inputValue={inputValue} />
      {/* <TypePicker /> */}
      <SearchButton />
    </form>
  );
}


