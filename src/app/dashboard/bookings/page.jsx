import MyBookingsTable from "@/components/dashboard/booking/MyBookings";
import { getBookings } from "@/lib/api/bookings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tenantId = session?.user?.id;
  console.log("ID", session.user.id);

  const bookings = await getBookings({ tenantId });
  console.log(bookings);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      {/* {bookings.length != 0 && (
        <h1 className="text-3xl font-bold text-center text-gray-800">
          My Bookings
        </h1>
      )} */}
      <MyBookingsTable bookings={bookings} />
    </div>
  );
}
