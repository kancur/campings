import React from 'react'
import { IoSearch } from 'react-icons/io5';

export function SearchButton() {
  return (
    <button
      type="submit"
      className="bg-amber-500 rounded-2xl p-3 text-gray-50 font-semibold flex items-center gap-1 focus:ring focus:ring-blue-400 focus:outline-none"
    >
      <IoSearch />
      Hľadať
    </button>
  );
}
