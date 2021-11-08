import '../styles/tailwind.css';
import Layout from '../components/base/Layout';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../context/authContext';

function WrappedWithCoorectLayout({ Component, pageProps }) {
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

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        {WrappedWithCoorectLayout({ Component, pageProps })}
      </AuthProvider>
    </CookiesProvider>
  );
}

export default MyApp;
