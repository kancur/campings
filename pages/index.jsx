import Head from 'next/head';
import SearchWrapper from '../components/search/SearchWrapper';
import { mountains, towns, waterBodies } from '../data/popularDestinations';
import Link from 'next/link';

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
          <div className="grid sm:grid-cols-3 gap-2 text-center sm:text-left">
            <DestinationWrapper title="Hory" destinations={mountains} />
            <DestinationWrapper title="Obce" destinations={towns} />
            <DestinationWrapper
              title="Vodné plochy"
              destinations={waterBodies}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function DestinationWrapper({ title, destinations }) {
  return (
    <div className="space-y-1">
      <h3 className="text-2xl font-semibold text-green-600">{title}</h3>
      <DestinationList destinations={destinations} />
    </div>
  );
}

function DestinationList({ destinations }) {
  return (
    <ul>
      {destinations.map((dest) => (
        <li>
          <Link href={dest.slug}>{dest.name}</Link>
        </li>
      ))}
    </ul>
  );
}
