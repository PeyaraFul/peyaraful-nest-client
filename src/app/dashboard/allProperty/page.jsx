import AllPropertiesTable from "@/components/dashboard/allProperties/AllProperties";

import { getProperties } from "@/lib/api/properties";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AllPropertyPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const admin = session?.user?.role;
  // console.log("ID", session.user.id);

  const allProperties = await getProperties();

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <AllPropertiesTable allProperties={allProperties} />
    </div>
  );
}
