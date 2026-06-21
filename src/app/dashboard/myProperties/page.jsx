import MyPropertiesTable from "@/components/dashboard/myProperties/MyProperty";
import { getProperties } from "@/lib/api/properties";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;
  // console.log("ID", session.user.id);

  const myProperties = await getProperties({ ownerId });

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <MyPropertiesTable myProperties={myProperties} />
    </div>
  );
}
