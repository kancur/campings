import dynamic from "next/dynamic"
import AdminLayout from '../../../components/admin/AdminLayout'

const Admin = dynamic(() => import("../../../components/admin/camps/CampListPage"), {
  ssr: false,
})

const CampListComponent = () => <Admin />

export default CampListComponent

CampListComponent.Layout = AdminLayout
