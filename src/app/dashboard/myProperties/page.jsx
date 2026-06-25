import MyPropertiesTable from "@/components/dashboard/myProperties/MyProperty";
import { getOwnerProperty } from "@/lib/api/properties";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;
  console.log("ID", session.user.id);
  // ownerId = "6a3b56d145e0e917a6b5875b";

  const myProperties = await getOwnerProperty(ownerId);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <MyPropertiesTable myProperties={myProperties} />
    </div>
  );
}
