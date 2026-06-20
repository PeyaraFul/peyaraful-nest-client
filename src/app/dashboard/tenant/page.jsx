"use client";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useSession } from "@/lib/auth-client";
import React from "react";
import {
  File,
  Person,
  Thunderbolt,
  Check,
  Briefcase,
  Bookmark,
} from "@gravity-ui/icons";

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (!session) {
    return <div>Not signed in</div>;
  }

  const recruiterStats = [
    { id: "job-posts", title: "Total Job Posts", value: "48", icon: File },
    {
      id: "applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: Person,
    },
    { id: "active", title: "Active Jobs", value: "18", icon: Thunderbolt },
    { id: "closed", title: "Jobs Closed", value: "32", icon: Check },
  ];

  return (
    <div>
      <h1 className="text-3xl font-medium">
        WellCome back {session.user.name}
      </h1>
    </div>
  );
};

export default RecruiterPage;
