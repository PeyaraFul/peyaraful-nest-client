import { BiSolidMessageRounded, BiSolidZap } from "react-icons/bi";
import { FaSearch, FaUsers } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";

import { IoShieldCheckmark } from "react-icons/io5";

const features = [
  {
    icon: FaHouseChimney,
    title: "Verified Properties",
    description:
      "Browse carefully reviewed property listings with reliable information.",
  },
  {
    icon: IoShieldCheckmark,
    title: "Secure Booking",
    description:
      "Transparent booking requests with owner approval for a safer renting experience.",
  },
  {
    icon: BiSolidZap,
    title: "Fast Experience",
    description:
      "Quick property search, instant booking requests, and an easy-to-use dashboard.",
  },
  {
    icon: BiSolidMessageRounded,
    title: "Direct Communication",
    description:
      "Connect directly with property owners without unnecessary intermediaries.",
  },
  {
    icon: FaSearch,
    title: "Smart Search",
    description:
      "Filter properties by location, price, category, and amenities in seconds.",
  },
  {
    icon: FaUsers,
    title: "Trusted Community",
    description:
      "Helping owners and tenants build trustworthy rental relationships.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-base-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Why Choose Peyaraful Nest?
          </h2>

          <p className="mt-4 text-gray-500">
            Find your perfect home or trusted tenant with confidence. Peyaraful
            Nest makes renting easier, faster, and more secure.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl  bg-primary/10 text-primary ring-1 ring-primary/20 transition-all ration-300 group-hover:bg-primary group-hover:text-primary-content group-hover:ring-primary">
                  <Icon className="text-3xl" />
                </div>

                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>

                <p className="leading-7 text-gray-500">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
