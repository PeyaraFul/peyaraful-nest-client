"use client";

import { FaHome, FaUsers, FaBuilding, FaCheckCircle } from "react-icons/fa";

const stats = [
  {
    icon: FaHome,
    value: "1,250+",
    label: "Properties Listed",
    description: "Quality homes and apartments available for rent.",
  },
  {
    icon: FaUsers,
    value: "3,800+",
    label: "Happy Tenants",
    description: "People who found their perfect home through Peyaraful Nest.",
  },
  {
    icon: FaBuilding,
    value: "620+",
    label: "Trusted Owners",
    description: "Verified property owners actively listing rentals.",
  },
  {
    icon: FaCheckCircle,
    value: "95%",
    label: "Successful Bookings",
    description: "Booking requests successfully completed every month.",
  },
];

export default function RentalStatistics() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-primary/5" />

      {/* Decorative Blur */}
      <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Rental Statistics
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Trusted by Hundreds of Property Owners & Tenants
          </h2>

          <p className="mt-5 text-base text-gray-500 md:text-lg">
            Peyaraful Nest continues to grow by connecting trusted property
            owners with reliable tenants through a secure and modern rental
            platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/30 bg-white/70 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className="
    mb-6 flex h-16 w-16 items-center justify-center
    rounded-2xl
    bg-primary/10
    text-primary
    ring-1 ring-primary/20
    transition-all duration-300
    group-hover:bg-primary
    group-hover:text-primary-content
    group-hover:ring-primary
  "
                >
                  <Icon className="text-3xl" />
                </div>

                <h3 className="text-4xl font-extrabold text-primary">
                  {stat.value}
                </h3>

                <h4 className="mt-3 text-xl font-semibold">{stat.label}</h4>

                <p className="mt-3 leading-7 text-gray-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
