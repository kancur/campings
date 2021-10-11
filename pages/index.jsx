import Head from 'next/head'
import SearchWrapper from '../components/SearchWrapper'

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Head>
        <title>Najkempy.sk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWrapper>
        Place for search input
      </SearchWrapper>

      <style global jsx>{`
      html,
      body,
      div#__next {
        height: 100%;
      }
      div#__next {
        display: flex;
        flex-direction: column;
      }
    `}</style>
    </div>
  )
}
