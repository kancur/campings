import Footer from '../base/Footer';
import Header from '../base/Header';
import AdminSidebar from './Sidebar';

export default function MainInterface({ children }) {
  return (
    <div className="top-0 right-0 bottom-0 left-0 md:absolute md:h-screen flex flex-col">
      <Header />
      <div className="bg-emerald-500 text-white text-xl text-center p-4 shadow-lg z-10">
        Administrácia
      </div>
      <div className="grid-rows-2 grid-cols-1 md:grid md:grid-rows-none md:grid-cols-5 flex-grow h-full min-h-0">
        <aside className="bg-gray-700 p-4 shadow-lg z-10">
          <AdminSidebar />
        </aside>
        <main className="col-span-4 bg-gray-200 md:overflow-y-scroll overflow-x-scroll md:overflow-x-auto flex-grow">
          {children}
        </main>
      </div>

      {/*  <Footer /> */}
    </div>
  );
}
