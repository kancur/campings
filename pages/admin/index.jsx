import dynamic from "next/dynamic"

const Admin = dynamic(() => import("../../admin/MainInterface"), {
  ssr: false,
})

const HomePage = () => <Admin />

export default HomePage