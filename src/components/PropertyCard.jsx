import React from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaExpandArrowsAlt,
  FaEye,
} from "react-icons/fa";
import Link from "next/link";

const PropertyCard = ({ property }) => {
  return (
    <div
      key={property._id}
      className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Property Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          height="300"
          width="300"
          src={
            property?.image ||
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop"
          }
          alt={property.propertyTitle}
          className=" h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur">
            {property.propertyType}
          </span>
        </div>

        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">
            {property.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
          {property.propertyTitle}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaMapMarkerAlt size={14} />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-primary">
            ৳ {property.rent?.toLocaleString()}
          </p>

          <p className="text-xs text-gray-500">{property.rentType}</p>
        </div>

        {/* Property Info */}
        <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-gray-50 p-3">
          <div className="flex flex-col items-center">
            <FaBed size={18} />
            <span className="mt-1 text-sm font-medium">
              {property.bedrooms}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <FaBath size={18} />
            <span className="mt-1 text-sm font-medium">
              {property.bathrooms}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <FaExpandArrowsAlt size={18} />
            <span className="mt-1 text-sm font-medium">
              {property.propertySize}
            </span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/properties/${property._id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-3 font-medium text-white transition hover:bg-black"
        >
          <FaEye size={16} />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
