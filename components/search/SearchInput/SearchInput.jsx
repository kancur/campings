import { useEffect, useState } from 'react';
import { searchSuggestions } from '../../../helpers/search';
import SuggestionsDropdown from './SuggestionsDropdown';
import useDebouncedSearch from '../../../hooks/useDebouncedSearch';
import LoadingSpinnerSVG from '../../general/LoadingSpinnerSVG';
import OutsideClickHandler from 'react-outside-click-handler';
import { SearchButton } from '../SearchButton';
import { ArrowTopNotification } from '../../general/ArrowTopNotification';

const useMainSearch = () =>
  useDebouncedSearch((query) => searchSuggestions(query));

export default function LocationPicker(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [searchQuery, setSearchQuery, searchResults] = useMainSearch();
  const [inputVisibleValue, setInputVisibleValue] = useState('');

  useEffect(() => {
    if (searchResults.status == 'success') {
      setCurrentSuggestions(searchResults.result);
    }
  }, [searchResults]);

  const handleInput = (e) => {
    props.setInputData({ type: 'query', query: e.target.value });
    setInputVisibleValue(e.target.value);
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleCloseDropdown = () => {
    setShowSuggestions(false);
  };

  useEffect(() => {
    handleActiveIndexChange(activeIndex);
  }, [activeIndex]);

  const handleActiveIndexChange = (index) => {
    if (index > -1) {
      const selectedSuggestionData = currentSuggestions[index];
      if (selectedSuggestionData) {
        setInputVisibleValue(selectedSuggestionData.name);
        props.setInputData({
          type: 'suggestion',
          data: selectedSuggestionData,
        });
      }
    } else {
      setInputVisibleValue(searchQuery);
      props.setInputData({ type: 'query', query: searchQuery });
    }
  };

  const handleSubmit = () => {
    setShowSuggestions(false);
    //handleActiveIndexChange(index);
    props.handleSubmit();
  };

  const handleDropdownClick = (index) => {
    setShowSuggestions(false);
    props.handleSubmit({ type: 'suggestion', data: currentSuggestions[index] });
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
        //handleSubmit();
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <label className="flex flex-col gap-2 sm:gap-0">
          <span className="font-semibold text-gray-600 text-lg sm:text-base">
            Kam chceš ísť?
          </span>
          <div className="relative">
            <input
              autoFocus
              autoComplete="off"
              maxLength={30}
              minLength={3}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="napr. Vysoké Tatry"
              className={
                'bg-transparent focus:outline-none text-gray-600 border-b border-gray-300 mx-1 sm:mx-0 sm:ml-1'
              }
              type="text"
              value={inputVisibleValue}
              aria-haspopup="true"
              aria-controls="suggestions"
            />
            {props.error && (
              <ArrowTopNotification>{props.error}</ArrowTopNotification>
            )}
          </div>
        </label>
      </div>
      {currentSuggestions &&
        currentSuggestions.length > 0 &&
        showSuggestions && (
          <SuggestionsDropdown
            activeIndex={activeIndex}
            locations={currentSuggestions}
            handleClick={handleDropdownClick}
            handleClose={handleCloseDropdown}
          />
        )}
    </div>
  );
}
