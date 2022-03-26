import { useSession } from "next-auth/react"
import AdminWrapper from "../../elements/admin/Wrapper";

const AdminIndex = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <AdminWrapper>
        <h1>Homepage</h1>
      </AdminWrapper>
    )
  }
  return null
}

export default AdminIndex;