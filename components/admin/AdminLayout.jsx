import Footer from "../Footer";
import Header from "../Header";
import AdminSidebar from "./Sidebar";

export default function MainInterface({children}) {
  return (
    <>
      <Header />
      <div className="bg-green-500 text-white text-xl text-center p-4 shadow-lg z-10">
        Administrácia
      </div>
      <div className="grid grid-cols-5 flex-grow">
        <aside className="bg-gray-700 p-4 shadow-lg z-10">
          <AdminSidebar />
        </aside>
        <main className="col-span-4 bg-gray-200">
          {children}
        </main>
      </div>
     {/*  <Footer /> */}
    </>
  );
}
