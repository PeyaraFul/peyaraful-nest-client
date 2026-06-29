import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "../../lib/stripe";

import { AiFillCheckCircle } from "react-icons/ai";
import { BiRightArrowAlt } from "react-icons/bi";
import { HiMail } from "react-icons/hi";

import { createBooking } from "@/lib/api/bookings";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  console.log("searchParams", searchParams);

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  console.log("session", session);

  const { status, customer_details, amount_total, currency, metadata } =
    session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount_total / 100);

  if (status === "complete") {
    const paymentIntentId =
      typeof session.payment_intent === "object"
        ? session.payment_intent.id
        : session.payment_intent;

    const payload = {
      propertyId: metadata?.propertyId,
      propertyName: metadata?.title,
      propertyImage: metadata?.propertyImage,
      amountPaid: Number(metadata?.price),
      tenantId: metadata?.userId,
      tenantEmail: metadata?.customerEmail || customerEmail,
      tenantName: customer_details?.name || "Customer",
      ownerId: metadata?.ownerId,
      propertyLocation: metadata?.propertyLocation,

      transactionInfo: {
        stripeSessionId: session.id,
        paymentIntentId: paymentIntentId,
        currency: currency?.toUpperCase() || "USD",
        paymentMethod: session.payment_method_types?.[0] || "card",
      },

      bookingStatus: "pending",
      paymentStatus: "paid",
      createdAt: new Date(),
    };

    await createBooking(payload) ;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.1] [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6))]" />
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm p-2 rounded-full text-white animate-bounce-short mb-4 relative z-10">
              <AiFillCheckCircle className="w-14 h-14" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white relative z-10 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-emerald-100 text-sm mt-2 relative z-10 font-medium">
              Thank you for your booking
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Amount Paid
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-1">
                {formattedAmount}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Receipt Email</span>
                <span className="font-medium text-slate-800 break-all max-w-[180px] sm:max-w-none text-right">
                  {customerEmail}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/60">
                <span className="text-slate-500">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Paid
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-sm text-center leading-relaxed px-2">
              We appreciate your business! A confirmation email has been sent to{" "}
              <span className="font-semibold text-slate-700">
                {customerEmail}
              </span>
              .
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Go to Homepage
                <BiRightArrowAlt className="w-5 h-5" />
              </Link>

              <a
                href="mailto:orders@example.com"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800"
              >
                <HiMail className="w-5 h-5 text-slate-400" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
