import { useEffect, useState } from 'react';
import { searchSuggestions } from '../../../helpers/search';
import SuggestionsDropdown from './SuggestionsDropdown';
import useDebouncedSearch from '../../../hooks/useDebouncedSearch';
import LoadingSpinnerSVG from '../../general/LoadingSpinnerSVG';
import OutsideClickHandler from 'react-outside-click-handler';
import { SearchButton } from '../SearchButton';

const useMainSearch = () =>
  useDebouncedSearch((query) => searchSuggestions(query));

export default function LocationPicker(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  // merged input data are those that are rendered as value in input
  // it can be a searchQuery or one of the currentSuggestions.name, if user
  // traverses the dropdown with keyboard
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [setSearchQuery, searchResults] = useMainSearch();

  useEffect(() => {
    if (searchResults.status == 'success') {
      setCurrentSuggestions(searchResults.result);
    }
  }, [searchResults]);

  useEffect(() => {
    handleSelect(activeIndex);
  }, [activeIndex]);

  const handleInput = (e) => {
    props.setInputData((prev) => ({...prev, q: e.target.value, activeIndex: -1}))
    setSearchQuery(e.target.value);
    //props.setInputValue(e.target.value);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleCloseDropdown = () => {
    setShowSuggestions(false);
  };

  const handleSelect = (index) => {
    if (index > -1) {
      const newInputData = currentSuggestions[index];
      if (newInputData) {
        props.setInputData((prev) => ({...prev, activeIndex: index, suggestionData: newInputData}))
      }
    } else {
      props.setInputData((prev) => ({...prev, activeIndex: index}))
    }
  };

  const handleSubmit = (index) => {
    setShowSuggestions(false);
    handleSelect(index);
    props.handleSubmit();
  };

  // handling of up, down and enter keys when focused on input
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

  const suggestionName = props.inputData?.suggestionData?.name || ''
  const userQuery = props.inputData?.q || ''

  return (
    <div className="flex flex-col">
      <div>
        <label className="flex flex-col gap-2 sm:gap-0">
          <span className="font-semibold text-gray-600 text-lg sm:text-base">
            Kam chceš ísť?
          </span>
          <div className="relative">
            <input
              autoComplete="off"
              maxLength={30}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="napr. Vysoké Tatry"
              className={
                'bg-transparent focus:outline-none text-gray-600 border-b border-gray-300 mx-1 sm:mx-0 sm:ml-1'
              }
              type="text"
              value={(activeIndex > -1) ? suggestionName : userQuery}
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
          <SuggestionsDropdown
            activeIndex={activeIndex}
            locations={currentSuggestions}
            handleClick={handleSubmit}
            handleClose={handleCloseDropdown}
          />
        )}
    </div>
  );
}
