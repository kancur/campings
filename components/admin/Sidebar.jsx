import { FaListUl, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function AdminSidebar() {
  return (
    <ul className="flex flex-col gap-y-3">
      <MenuItem href="/admin/camps" text="All campsites">
        <FaListUl className="text-white" />
      </MenuItem>
      <MenuItem href="/admin/camps/new" text="Add new campsite">
        <FaPlusCircle className="text-white" />
      </MenuItem>
    </ul>
  );
}

function MenuItem({ children, href, text }) {
  const router = useRouter();
  const isActive = router.pathname == href;

  return (
    <li
      className={` p-3 rounded-lg flex items-center gap-x-2 text-gray-50 text-xl ${
        isActive ? 'bg-gray-500' : ''
      }`}
    >
      {children}
      <Link href={href}>{text}</Link>
    </li>
  );
}
