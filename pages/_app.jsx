import '../styles/tailwind.css';
import Layout from '../components/Layout';
  
function MyApp({ Component, pageProps }) {
  const wrappedComponent = Component.Layout ? (
    <Component.Layout>
      <Component {...pageProps} />
    </Component.Layout>
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  return wrappedComponent;
}

export default MyApp;
