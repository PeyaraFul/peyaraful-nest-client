import BookingRequestsTable from "@/components/dashboard/bookingRequest/BookingRequest";
import { getBookings } from "@/lib/api/bookings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;
  console.log("ID", session.user.id);

  const bookings = await getBookings(ownerId);
  // console.log(bookings);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <BookingRequestsTable bookings={bookings} />
    </div>
  );
}
