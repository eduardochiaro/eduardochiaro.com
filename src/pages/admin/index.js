import { useSession } from "next-auth/react"
import Head from "next/head";
import AdminWrapper from "../../components/admin/Wrapper";

const AdminIndex = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <AdminWrapper>
        <Head>
          <title>Eduardo Chiaro - Admin</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Eduardo Chiaro - Software Developer" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        </Head>
        <h1>Homepage</h1>
      </AdminWrapper>
    )
  }
  return null
}

export default AdminIndex;