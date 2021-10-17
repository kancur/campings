import Head from 'next/head';
import PopularCampsWrapper from '../components/most_popular_camps_showcase/PopularCampsWrapper';
import SearchForm from '../components/search/SearchForm';
import Search from '../components/search/Search';

export default function Home(props) {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Najkempy.sk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search searchDatabase={props.data}/>
      <section className="pb-10">
        <h1 className="text-3xl text-center p-5">Populárne kempy</h1>
        <PopularCampsWrapper />
      </section>
    </div>
  );
}