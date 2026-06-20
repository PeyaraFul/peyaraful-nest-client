import React from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaExpandArrowsAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { getProperty } from "@/lib/api/properties";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const PropertyDetailPage = async ({ params }) => {
  const { id } = await params;

  const property = await getProperty(id);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Property Detail Page
      </h1>

      <section className="bg-slate-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Hero Image */}
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={property.image}
              alt={property.propertyTitle}
              width={1400}
              height={700}
              className=" h-[300px] md:h-[500px] w-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {property.propertyType}
                    </span>

                    <h1 className="mt-3 text-3xl font-bold text-slate-900">
                      {property.propertyTitle}
                    </h1>

                    <div className="mt-2 flex items-center gap-2 text-slate-500">
                      <FaMapMarkerAlt />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-primary">
                      ৳ {property.rent.toLocaleString()}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {property.rentType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-semibold">
                  Property Information
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <FaBed className="mx-auto text-xl" />
                    <p className="mt-2 font-semibold">{property.bedrooms}</p>
                    <span className="text-sm text-slate-500">Bedrooms</span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <FaBath className="mx-auto text-xl" />
                    <p className="mt-2 font-semibold">{property.bathrooms}</p>
                    <span className="text-sm text-slate-500">Bathrooms</span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <FaExpandArrowsAlt className="mx-auto text-xl" />
                    <p className="mt-2 font-semibold">
                      {property.propertySize}
                    </p>
                    <span className="text-sm text-slate-500">Area</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Description</h3>

                <p className="leading-8 text-slate-600">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Amenities</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Features */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Extra Features</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.extraFeatures?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Owner Card */}
            <div>
              <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-lg">
                <h3 className="mb-5 text-xl font-semibold">
                  Owner Information
                </h3>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-bold">
                    {property.ownerInformation.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      {property.ownerInformation.name}
                    </h4>

                    <p className="text-sm text-slate-500">Property Owner</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <FaPhone />
                    <span>{property.ownerInformation.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaEnvelope />
                    <span>{property.ownerInformation.email}</span>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-2xl bg-primary py-3 font-medium text-white hover:opacity-90">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailPage;
