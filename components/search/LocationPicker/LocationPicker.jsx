import { useEffect, useState } from "react";
import { searchAllTypes } from "../../../helper_functions/search";
import LocationPickerDropdown from "./LocationPickerDropdown";

export default function LocationPicker() {
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [querriedLocations, setQuerriedLocations] = useState([]);
  const [chosenLocation, setChosenLocation] = useState();
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleInput = (e) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleClick = (index) => {
    if (index > -1) {
      const newInputValue = querriedLocations[index].name;
      if (newInputValue) {
        setInput(newInputValue);
      }
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "ArrowUp") {
      if (activeIndex > 0) {
        setActiveIndex((prevState) => prevState - 1);
      }
    }
    if (e.code === "ArrowDown") {
      if (activeIndex < querriedLocations.length - 1) {
        setActiveIndex((prevState) => prevState + 1);
      }
    }
    if (e.code === "Enter") {
      handleClick(activeIndex);
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
    setQuerriedLocations(searchAllTypes(input));
  }, [input]);

  return (
    <div className="flex flex-col w-full">
      <div>
        <label className="flex flex-col	">
          <span className="font-semibold text-gray-600">Lokalita</span>
          <input
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="napr. Vysoké Tatry"
            className={
              "bg-transparent focus:outline-none searchbar-input text-gray-600 border-b border-gray-300"
            }
            type="text"
            value={input || ''}
            aria-haspopup="true"
            aria-controls="suggestions"
          />
        </label>
      </div>
      {querriedLocations.length > 0 && input.length > 0 && showSuggestions && (
        <LocationPickerDropdown
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          locations={querriedLocations}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}
