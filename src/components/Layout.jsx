import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow pb-20 md:pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
