import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
        <div className="flex-grow flex flex-col">{children}</div>
      <Footer />
    </>
  );
}
