import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';

// debounce time in miliseconds
const DEBOUNCE_TIME = 50;

const useDebouncedSearch = (searchFunction: (inputText: string) => void) => {
  const [inputText, setInputText] = useState('');

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, DEBOUNCE_TIME)
  );

  const searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return [];
    } else {
      return debouncedSearchFunction(inputText);
    }
  }, [debouncedSearchFunction, inputText]);

  return [inputText, setInputText, searchResults];
};

export default useDebouncedSearch;
