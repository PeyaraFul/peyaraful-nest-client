import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProperty } from "@/lib/api/properties";
import PropertyDetailsClient from "@/components/shared/PropertyDetails";

const PropertyDetailPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const property = await getProperty(id);

  return <PropertyDetailsClient property={property} session={session} />;
};

export default PropertyDetailPage;
