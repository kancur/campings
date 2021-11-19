import '../styles/tailwind.css';
import Layout from '../components/base/Layout';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../context/authContext';
import { useEffect } from 'react';
import { PreviousPathProvider } from '../context/pathHistoryContext';

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
    <PreviousPathProvider>
      <CookiesProvider>
        <AuthProvider>
          {WrappedWithCoorectLayout({ Component, pageProps })}
        </AuthProvider>
      </CookiesProvider>
    </PreviousPathProvider>
  );
}

export default MyApp;
