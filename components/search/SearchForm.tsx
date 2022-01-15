import SearchInput from './SearchInput/SearchInput';
import Router from 'next/router';
import { SearchButton } from './SearchButton';
import React, { useEffect, useState } from 'react';
import { SearchData } from '../../interfaces/baseInterfaces';

export default function SearchForm({shouldFocus}: {shouldFocus: boolean}) {


  const [inputData, setInputData] = useState<SearchData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // remove error message if something new is typed
    setError('');
  }, [inputData]);

  const handleSubmit = (data: SearchData | null = inputData) => {
    if (data === null) return;
    
    if (data.type === 'suggestion') {
      const type = data?.data?.type
      const slug = data?.data?.slug
      //if (type.length === 0) return;
      switch (type) {
        case 'village':
          Router.push(`/obec/${slug}`);
          break;
        case 'waterbody':
          Router.push(`/voda/${slug}`);
          break;
        case 'camp':
          Router.push(`/kemp/${slug}`);
          break;
        default:
          Router.push(`/${slug}`);
          break;
      }
    }

    if (data.type === 'query') {
      if (data.query) {
        if (data.query.length < 3) {
          setError('Prosím zadaj aspoň 3 znaky 😉');
          return;
        }
        Router.push(`/search/?q=${encodeURIComponent(inputData?.query || '')}`);
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
        shouldFocus={shouldFocus}
        setInputData={setInputData}
        inputData={inputData}
        handleSubmit={handleSubmit}
        error={error}
      />
      <SearchButton />
    </form>
  );
}
