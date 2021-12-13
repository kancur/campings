import Head from 'next/head';
import SearchWrapper from '../components/search/SearchWrapper';
import { mountains, towns, waterBodies } from '../data/popularDestinations';
import PopularDestinations from '../components/base/Popular/PopularDestinations';

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
          <h2 className="text-3xl font-semibold text-center">
            Obľúbené destinácie
          </h2>
          <PopularDestinations />
        </div>
      </section>
    </div>
  );
}

