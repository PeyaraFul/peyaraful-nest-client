import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api/properties";

const Features = async () => {
  const properties = await getProperties();

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {properties?.map((property) => (
          <PropertyCard key={property._id} property={property}></PropertyCard>
        ))}
       
      </div>
    </section>
  );
};

export default Features;