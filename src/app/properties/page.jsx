import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api/properties";
import React from "react";

const Properties = async () => {
  const properties = await getProperties();
  return (
    <div>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          All Properties
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties?.map((property) => (
            <PropertyCard key={property._id} property={property}></PropertyCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;
