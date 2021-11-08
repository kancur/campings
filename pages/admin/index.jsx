import dynamic from 'next/dynamic';
import AdminLayout from '../../components/admin/AdminLayout';

const Admin = dynamic(() => import('../../components/admin/AdminPage'), {
  ssr: false,
});

const AdminPageComponent = () => <Admin />;
AdminPageComponent.Layout = AdminLayout;

export default AdminPageComponent;
