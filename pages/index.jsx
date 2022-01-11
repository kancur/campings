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
      <SearchWrapper searchDatabase={props.data} />
      <section className="p-5">
        <div className="space-y-4 max-w-xl mx-auto">
          <PopularDestinations />
          <PopularCampings />
        </div>
      </section>
    </div>
  );
}
