import { useEffect, useRef, useState } from 'react';
import { searchAllTypes } from '../../../helpers/search';
import LocationPickerDropdown from './LocationPickerDropdown';

export default function LocationPicker(props) {
  const [userInputValue, setUserInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [querriedLocations, setQuerriedLocations] = useState([]);
  const [chosenLocation, setChosenLocation] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (props.inputValue === '') {
      setShowSuggestions(false);
    }
  }, [props.inputValue]);

  const handleInput = (e) => {
    setUserInputValue(e.target.value);
    props.setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (index) => {
    if (index === -1) {
      props.setInputValue(userInputValue);
    }
    if (index > -1) {
      const newInputValue = querriedLocations[index].name;
      if (newInputValue) {
        props.setInputValue(newInputValue);
      }
    }
  };

  useEffect(() => {
    handleSelect(activeIndex);
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > -1) {
          setActiveIndex((prevState) => prevState - 1);
        }
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < querriedLocations.length - 1) {
          setActiveIndex((prevState) => prevState + 1);
        }
      }
      if (e.code === 'Enter') {
        if (showSuggestions) {
          // dont submit the field if dropdown is shown
        }
        setShowSuggestions(false);
      }
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
    setQuerriedLocations(searchAllTypes(userInputValue));
  }, [userInputValue]);

  return (
    <div className="flex flex-col">
      <div>
        <label className="flex flex-col	">
          <span className="font-semibold text-gray-600">Lokalita</span>
          <input
            autoComplete="off"
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="napr. Vysoké Tatry"
            className={
              'bg-transparent focus:outline-none text-gray-600 border-b border-gray-300 w-full'
            }
            type="text"
            value={props.inputValue || ''}
            aria-haspopup="true"
            aria-controls="suggestions"
          />
        </label>
      </div>
      {querriedLocations.length > 0 && showSuggestions && (
        <LocationPickerDropdown
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          locations={querriedLocations}
          handleClick={handleSelect}
        />
      )}
    </div>
  );
}
