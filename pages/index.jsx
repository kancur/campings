import Head from 'next/head'
import SearchBar from '../components/search/SearchBar'
import SearchWrapper from '../components/search/SearchWrapper'

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Najkempy.sk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>

      <style global jsx>{`
      html,
      body,
      div#__next {
        height: 100%;
      }
      html{
        overflow-y: scroll;
      }
      div#__next {
        display: flex;
        flex-direction: column;
      }
    `}</style>
    </div>
  )
}
