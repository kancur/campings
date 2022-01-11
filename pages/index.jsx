import Head from 'next/head';
import SearchWrapper from '../components/search/SearchWrapper';
import { mountains, towns, waterBodies } from '../data/popularDestinations';
import PopularDestinations from '../components/base/Popular/PopularDestinations';
import PopularCampings from '../components/base/Popular/PopularCampings';

export default function Home(props) {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Najkempy.sk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWrapper searchDatabase={props.data} shouldFocus={true} />
      <section className="px-3 sm:px-8">
        <div className="mx-auto">
          <PopularDestinations />
        </div>
      </section>
    </div>
  );
}
