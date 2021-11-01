import LocationPicker from './LocationPicker/LocationPicker';
import Router from 'next/router';
import { SearchButton } from './SearchButton';
import { useEffect, useRef, useState } from 'react';
import toSlug from '../../helpers/toSlug';

export default function SearchForm(props) {
  const [submittedData, setSubmittedData] = useState();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      handleSubmit();
    } else {
      isMounted.current = true;
    }
  }, [submittedData]);

  const handleSubmit = () => {
    const type = submittedData?.type;

    if (type === 'village') {
      Router.push(`/obec/${submittedData.slug}`);
    } else if (type?.length > 0) {
      Router.push(`/${submittedData.slug}`);
    } else {
      Router.push(`/search/?q=${encodeURIComponent(submittedData?.query)}`)
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex px-5 py-3 bg-gray-50	rounded-3xl gap-4 justify-between max-w-searchBar"
    >
      <LocationPicker
        setSubmittedData={setSubmittedData}
        handleSubmit={handleSubmit}
      />
      {/* <TypePicker /> */}
      <SearchButton />
    </form>
  );
}
