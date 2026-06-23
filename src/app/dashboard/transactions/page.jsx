import AdminTransactionsTable from "@/components/dashboard/payment/AllPament";
import { getPayments } from "@/lib/api/payments";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TransactionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const adminId = session?.user?.id;
  // console.log("ID", session.user.id);

  const transactionData = await getPayments();

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <AdminTransactionsTable transactions={transactionData} />
    </div>
  );
}
