import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
  const wrappedComponent = Component.Layout ? (
    <Component.Layout>
      <Component {...pageProps} />
    </Component.Layout>
  ) : (
    <Component {...pageProps} />
  )

  return wrappedComponent
}

export default MyApp;