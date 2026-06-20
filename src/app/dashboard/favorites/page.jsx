import FavoriteTable from "@/components/dashboard/favorite/Favorite";
import { getFavorites } from "@/lib/api/favorites";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tenantId = session?.user?.id;
  console.log("ID", session.user.id);

  const favorites = await getFavorites({ tenantId });

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <FavoriteTable favorites={favorites} />
    </div>
  );
}
