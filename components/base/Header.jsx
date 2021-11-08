import Image from 'next/image';
import Link from 'next/link';

import Button from '../general/Button';
import HeaderMenu from './HeaderMenu';

export default function Header(props) {
  return (
    <header className="bg-gray-100 p-4 z-50">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 w-1/3">
          <Link href="/">
            <a>
              <h1 className="text-4xl	text-brand font-bold px-4 py-1">Najkempy.sk</h1>
            </a>
          </Link>
        </div>
        <div className="flex flex-1 justify-end w-2/3">
          <HeaderMenu />
        </div>
      </div>
      {props.children}
    </header>
  );
}
