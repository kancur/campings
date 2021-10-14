import Head from 'next/head';
import SearchBar from '../../components/search/SearchBar';
import SearchResultsWrapper from '../../components/search/SearchResultsWrapper';
import SearchWrapper from '../../components/search/SearchWrapper';

export default function SearchResults() {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Search results</title>
      </Head>
      <SearchWrapper />
      <SearchResultsWrapper />     
    </div>
  );
}
