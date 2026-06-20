// import type {ComponentType, SVGProps} from "react";

import { Button, Drawer } from "@heroui/react";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    { icon: FaHome, label: "Overview", href: "/dashboard/overview" },
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
