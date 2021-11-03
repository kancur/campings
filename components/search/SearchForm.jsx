import SearchInput from './SearchInput/SearchInput';
import Router from 'next/router';
import { SearchButton } from './SearchButton';
import { useEffect, useRef, useState } from 'react';

export default function SearchForm(props) {
  const [inputData, setInputData] = useState();
  //const [submittedData, setSubmittedData] = useState();
  const [inputValue, setInputValue] = useState();
  //const isMounted = useRef(false);

  useEffect(() => {
    console.log(inputData);
  }, [inputData]);

  const handleSubmit = () => {
    console.log('handling submit')
    console.log(inputData)
    const isUsingSuggestion = inputData.activeIndex !== -1;

    if (isUsingSuggestion) {
      const {type, slug} = inputData.suggestionData;
      if (type === 'village') {
        Router.push(`/obec/${slug}`);
      } else if (type?.length > 0) {
        Router.push(`/${slug}`);
      }
    } else {
      if (inputData.q) {
        Router.push(`/search/?q=${encodeURIComponent(inputData.q)}`);
      }
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row px-3 py-3 sm:px-3 sm:py-3 bg-gray-50	rounded-3xl gap-2 sm:gap-4 justify-between max-w-searchBar shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <SearchInput
        setInputData={setInputData}
        inputData={inputData}
        handleSubmit={handleSubmit}
        setInputValue={setInputValue}
        inputValue={inputValue}
        //setSubmittedData={setSubmittedData}
        handleSubmit={handleSubmit}
      />
      <SearchButton />
    </form>
  );
}
