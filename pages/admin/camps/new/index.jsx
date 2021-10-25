import dynamic from "next/dynamic"
import AdminLayout from '../../../../components/admin/AdminLayout'

const Admin = dynamic(() => import("../../../../components/admin/camps/new/EditOrAddCamp"), {
  ssr: false,
})

const AddNewCampComponent = () => <Admin />

export default AddNewCampComponent

AddNewCampComponent.Layout = AdminLayout