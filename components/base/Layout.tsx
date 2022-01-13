import React from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col bg-gray-50">{children}</div>
      <Footer />
    </>
  );
}
