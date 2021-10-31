import { FaHome, FaListUl, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function AdminSidebar() {
  return (
    <ul className="flex flex-col gap-y-3">
      <MenuItem href="/admin">
        <FaHome className="text-white" /> Dashboard
      </MenuItem>
      <MenuItem href="/admin/camps">
        <FaListUl className="text-white" /> All campsites
      </MenuItem>
      <MenuItem href="/admin/camps/new">
        <FaPlusCircle className="text-white" /> Add new campsite
      </MenuItem>
    </ul>
  );
}

function MenuItem({ children, href, text }) {
  const router = useRouter();
  const isActive = router.pathname == href;

  return (
    <li
      
    >
      <Link href={href} >
        <a className={`p-3 rounded-lg flex items-center gap-x-2 text-gray-50 text-xl ${
        isActive ? 'bg-gray-500' : ''
      }`}>{children}</a>
      </Link>
    </li>
  );
}
