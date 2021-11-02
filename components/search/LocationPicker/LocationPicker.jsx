import { useEffect, useRef, useState } from 'react';
import { searchEverything } from '../../../helpers/search';
import LocationPickerDropdown from './LocationPickerDropdown';
import useDebouncedSearch from '../../../hooks/useDebouncedSearch';
import LoadingSpinnerSVG from '../../general/LoadingSpinnerSVG';
const useMainSearch = () =>
  useDebouncedSearch((query) => searchEverything(query));

export default function LocationPicker(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputData, setInputData] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [searchQuery, setSearchQuery, searchResults] = useMainSearch();

  useEffect(() => {
    if (searchResults.status == 'success') {
      setCurrentSuggestions(searchResults.result);
    }
  }, [searchResults]);

  useEffect(() => {
    if (inputData === '') {
      setShowSuggestions(false);
    }
  }, [inputData]);

  useEffect(() => {
    handleSelect(activeIndex);
  }, [activeIndex]);

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
    setInputData({ name: e.target.value });
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleSelect = (index) => {
    if (index === -1) {
      setInputData({ name: searchQuery });
    }
    if (index > -1) {
      const newInputData = currentSuggestions[index];
      if (newInputData) {
        setInputData(newInputData);
      }
    }
  };

  const handleSubmit = (index) => {
    console.log('handling submit with index:', index)
    setShowSuggestions(false);
    handleSelect(index);
    if (index === -1){
      props.setSubmittedData({query: searchQuery})
      return
    }
    props.setSubmittedData(currentSuggestions[index]);
  };

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
        if (activeIndex < currentSuggestions.length - 1) {
          setActiveIndex((prevState) => prevState + 1);
        }
      }
      if (e.code === 'Enter') {
        handleSubmit(activeIndex);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <label className="flex flex-col">
          <span className="font-semibold text-gray-600">Lokalita</span>
          <div className="relative">
            <input
              autoComplete="off"
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="napr. Vysoké Tatry"
              className={
                'bg-transparent focus:outline-none text-gray-600 border-b border-gray-300 w-full'
              }
              type="text"
              value={inputData?.name || ''}
              aria-haspopup="true"
              aria-controls="suggestions"
            />
            {/* {searchResults.loading && <LoadingSpinnerSVG />} */}
          </div>
        </label>
      </div>
      {currentSuggestions &&
        currentSuggestions.length > 0 &&
        showSuggestions && (
          <LocationPickerDropdown
            activeIndex={activeIndex}
            locations={currentSuggestions}
            handleClick={handleSubmit}
          />
        )}
    </div>
  );
}
