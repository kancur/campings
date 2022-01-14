import { FaHome, FaListUl, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function AdminSidebar() {
  return (
    <ul className="flex flex-col gap-y-3">
      <MenuItem href="/admin">
        <FaHome /> Dashboard
      </MenuItem>
      <MenuItem href="/admin/camps">
        <FaListUl /> All campsites
      </MenuItem>
      <MenuItem href="/admin/camps/new">
        <FaPlusCircle /> Add new campsite
      </MenuItem>
    </ul>
  );
}

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
};

function MenuItem({ children, href }: MenuItemProps) {
  const router = useRouter();
  const isActive = router.pathname == href;

  return (
    <li>
      <Link href={href}>
        <a
          className={`p-3 rounded-lg flex items-center gap-x-2 text-gray-50 text-xl hover:text-gray-300 ${
            isActive ? 'bg-gray-500' : ''
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}
