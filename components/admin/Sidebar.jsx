import { FaListUl, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <ul className="flex flex-col gap-y-3">
      <MenuItem>
        <FaPlusCircle className="text-green-300" />
        <Link href="/admin/add-new">Add new camping</Link>
      </MenuItem>

      <MenuItem>
        <FaListUl className="text-green-300" />
        All campings
      </MenuItem>
    </ul>
  );
}

const MenuItem = ({ children }) => (
  <li className="flex items-center gap-x-2 text-gray-50 text-xl">
    {children}
  </li>
);
