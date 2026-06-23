import AllUsersAdminTable from "@/components/allUser/AllUserTable.";

import { getUsers } from "@/lib/api/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const adminId = session?.user?.id;
  // console.log("ID", session.user.id);

  const users = await getUsers(adminId);
  // console.log(users);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <AllUsersAdminTable users={users} />
    </div>
  );
}
