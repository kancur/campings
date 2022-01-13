import Head from 'next/head';
import SearchWrapper from '../components/search/SearchWrapper';
import PopularDestinations from '../components/base/Popular/PopularDestinations';

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Najkempy.sk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWrapper shouldFocus={true} />
      <section className="px-3 sm:px-8">
        <div className="mx-auto">
          <PopularDestinations />
        </div>
      </section>
    </div>
  );
}
