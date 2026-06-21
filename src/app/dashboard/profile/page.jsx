"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ProfileCard() {
  const { data: session } = authClient.useSession();
  //    console.log(session);
  const user = session?.user;

  // console.log(session);
  return (
    // min-h-screen gives it full viewport height, items-center centers it vertically, justify-center centers it horizontally
    <div className="lg:w-240 bg-gray-50  lg:pl-40 dark:bg-gray-900 flex items-center justify-center p-4">
      {/* CARD WRAPPER */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden my-auto">
        {/* TOP BANNER */}
        <div className="h-36 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <Image
              src={user?.photoUrl || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="profile"
              width={96}
              height={96}
              className="rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-16 px-6 pb-8">
          {/* HEADER */}
          <div className="text-center sm:text-left sm:flex sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {user?.name || "Unknown User"}
              </h1>

              <p className="text-gray-500 dark:text-gray-300">{user?.email}</p>

              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-50/20 dark:text-indigo-300">
                {user?.role || "Tenant"}
              </span>
            </div>

            <button className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {/* INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
              <FaEnvelope className="text-indigo-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Email
                </p>
                <p className="font-medium text-gray-800 dark:text-white break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
              <FaPhone className="text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Phone
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  {user?.phone || "Not added"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 sm:col-span-2">
              <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Address
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  {user?.address || "Not added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
