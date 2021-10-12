import Head from 'next/head'
import PopularCampsWrapper from '../components/most_popular_camps_showcase/PopularCampsWrapper'
import SearchBar from '../components/search/SearchBar'
import SearchWrapper from '../components/search/SearchWrapper'

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Najkempy.sk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWrapper />
      <h1 className="text-3xl text-center p-5">Populárne kempy</h1>
      <PopularCampsWrapper />

      <style global jsx>{`

    `}</style>
    </div>
  )
}
