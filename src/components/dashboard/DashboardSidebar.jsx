// import type {ComponentType, SVGProps} from "react";

import { Button, Drawer } from "@heroui/react";
import {
  MdAddCircleOutline,
  MdFavoriteBorder,
  MdOutlineStore,
  MdPayment,
} from "react-icons/md";
import { FaHome, FaRegBookmark, FaUsers } from "react-icons/fa";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { SiSimpleanalytics } from "react-icons/si";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DashboardSidebar() {
  const tenantNavItems = [
    {
      icon: HiClipboardDocumentCheck,
      label: "My bookings",
      href: "/dashboard/bookings",
    },
    {
      icon: MdFavoriteBorder,
      label: "Favorites",
      href: "/dashboard/favorites",
    },
    { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
  ];

  const ownerNavItems = [
    {
      icon: SiSimpleanalytics,
      label: "Analytics",
      href: "/dashboard/home",
    },
    {
      icon: MdOutlineStore,
      label: "My Property",
      href: "/dashboard/myProperties",
    },
    {
      icon: MdAddCircleOutline,
      label: "Add Property",
      href: "/dashboard/addProperty",
    },
    {
      icon: VscGitPullRequestNewChanges,
      label: "Booking Requests",
      href: "/dashboard/bookingRequest",
    },
    { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
  ];
  const adminNavItems = [
    {
      icon: FaUsers,
      label: "All Users",
      href: "/dashboard/allUser",
    },
    {
      icon: MdOutlineStore,
      label: "All Properties",
      href: "/dashboard/allProperty",
    },
    {
      icon: FaRegBookmark,
      label: "All Bookings",
      href: "/dashboard/bookings",
    },
    {
      icon: MdPayment,
      label: "Transactions",
      href: "/dashboard/transactions",
    },
    { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
  ];

  let navItems = [];

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userRole = session?.user?.role;
  console.log("userRole", userRole);
  if (userRole === "tenant") {
    navItems = tenantNavItems;
  } else if (userRole === "owner") {
    navItems = ownerNavItems;
  } else if (userRole === "admin") {
    navItems = adminNavItems;
  }

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block bg-amber-200 ">{navContent}</aside>

      <Drawer>
        <Button variant="secondary" className="lg:hidden">
          {/* <Bars /> */}
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
