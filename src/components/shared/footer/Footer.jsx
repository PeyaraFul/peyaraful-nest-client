"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                <FaHome className="text-xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Peyaraful Nest
                </h2>
                <p className="text-sm text-slate-400">
                  Find Your Perfect Place
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Peyaraful Nest is a trusted rental platform connecting property
              owners and tenants. Discover apartments, houses, villas, offices,
              and commercial spaces with a secure and seamless booking
              experience.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "#",
                },
                {
                  icon: <FaTwitter />,
                  href: "#",
                },
                {
                  icon: <FaInstagram />,
                  href: "#",
                },
                {
                  icon: <FaLinkedinIn />,
                  href: "#",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-4">
              <Link href="/" className="block transition hover:text-primary">
                Home
              </Link>

              <Link
                href="/properties"
                className="block transition hover:text-primary"
              >
                Properties
              </Link>

              <Link
                href="/about"
                className="block transition hover:text-primary"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Property */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Property</h3>

            <div className="space-y-4">
              <Link
                href="/properties?type=apartment"
                className="block transition hover:text-primary"
              >
                Apartments
              </Link>

              <Link
                href="/properties?type=house"
                className="block transition hover:text-primary"
              >
                Houses
              </Link>

              <Link
                href="/properties?type=villa"
                className="block transition hover:text-primary"
              >
                Villas
              </Link>

              <Link
                href="/properties?type=office"
                className="block transition hover:text-primary"
              >
                Offices
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <p>+880 1234-567890</p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <p>support@peyarafulnest.com</p>
              </div>

              {/* Newsletter */}
              <div className="pt-2">
                <p className="mb-3 text-sm text-slate-400">
                  Subscribe to our newsletter
                </p>

                <div className="flex overflow-hidden rounded-xl border border-slate-700">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                  />

                  <button className="bg-primary px-5 font-semibold text-white transition hover:brightness-110">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© {year} Peyaraful Nest. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition hover:text-primary"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
