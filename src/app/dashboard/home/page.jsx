"use client";

import { getPaymentData } from "@/lib/api/payments";

import { getBookings } from "@/lib/api/bookings";
import { getProperties } from "@/lib/api/properties";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaHome, FaCalendarCheck } from "react-icons/fa";

const summaryCards = [
  {
    id: 1,
    key: "totalEarnings",
    title: "Total Earnings",
    prefix: "$",
    icon: FaMoneyBillWave,
    description: "Sum of all successful booking payments received.",
    gradient: "from-emerald-500 to-teal-500",
    softBg: "bg-emerald-50",
    iconBg: "bg-emerald-500/15",
    textColor: "text-emerald-700",
  },
  {
    id: 2,
    key: "totalProperties",
    title: "Total Properties",
    prefix: "",
    icon: FaHome,
    description: "Number of properties you created.",
    gradient: "from-violet-500 to-fuchsia-500",
    softBg: "bg-violet-50",
    iconBg: "bg-violet-500/15",
    textColor: "text-violet-700",
  },
  {
    id: 3,
    key: "totalBookings",
    title: "Total Bookings",
    prefix: "",
    icon: FaCalendarCheck,
    description: "Number of confirmed bookings across all properties.",
    gradient: "from-sky-500 to-cyan-500",
    softBg: "bg-sky-50",
    iconBg: "bg-sky-500/15",
    textColor: "text-sky-700",
  },
];

function formatNumber(value) {
  if (value === undefined || value === null) return "0";
  return new Intl.NumberFormat("en-BD").format(value);
}

export default function OwnerSummaryCards() {
  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalProperties: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      const ownerId = session?.user?.id;
      if (!ownerId) return;

      try {
        const [paymentData, bookingData, propertyData] = await Promise.all([
          getPaymentData(ownerId).catch(() => []),
          getBookings(ownerId).catch(() => []),
          getProperties(ownerId).catch(() => []),
        ]);

        const calculatedEarnings = (paymentData || [])
          .filter((payment) => payment.paymentStatus?.toLowerCase() === "paid")
          .reduce((acc, curr) => acc + (curr.amount || 0), 0);

        setStats({
          totalEarnings: calculatedEarnings,
          totalProperties: propertyData?.length || 0,
          totalBookings: bookingData?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, [session?.user?.id]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Owner Dashboard Summary
          </h2>
          <p className="text-sm text-gray-500">
            Quick overview of your earnings, properties, and confirmed bookings.
          </p>
        </div>

        <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
          Live Summary Data
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          const displayValue = stats[card.key];

          return (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-3xl border border-white/60 ${card.softBg} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Top gradient bar */}
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.gradient}`}
              />

              {/* Background glow */}
              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl transition-all duration-300 group-hover:scale-110`}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                {/* Left content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <div className="mt-3 flex items-end gap-1">
                    {card.prefix && (
                      <span className="pb-1 text-lg font-semibold text-gray-500">
                        {card.prefix}
                      </span>
                    )}

                    <h3 className="truncate text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      {formatNumber(displayValue)}
                    </h3>
                  </div>

                  <p className="mt-3 max-w-[28ch] text-sm leading-6 text-gray-500">
                    {card.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} backdrop-blur-sm`}
                >
                  <Icon className={`text-2xl ${card.textColor}`} />
                </div>
              </div>

              {/* Bottom mini stats line */}
              <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/60 pt-4">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  Owner Insight
                </span>

                <span
                  className={`rounded-full bg-white/80 px-3 py-1 text-xs font-semibold ${card.textColor} shadow-sm`}
                >
                  Live Summary
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
