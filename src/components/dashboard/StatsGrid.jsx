import React from "react";
import { Card } from "@heroui/react";

export default function StatsGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.id}
            className="
              group relative overflow-hidden
              border border-neutral-200 dark:border-neutral-800
              bg-white dark:bg-neutral-950/40
              text-neutral-900 dark:text-white
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
              hover:border-neutral-300 dark:hover:border-neutral-700
            "
          >
            <Card.Content className="flex flex-col gap-4 p-5">
              {/* Icon */}
              <div
                className="
                  flex h-11 w-11 items-center justify-center rounded-xl
                  bg-neutral-100 dark:bg-neutral-900
                  border border-neutral-200 dark:border-neutral-800
                  text-neutral-600 dark:text-neutral-300
                  group-hover:text-black dark:group-hover:text-white
                  transition
                "
              >
                {Icon && <Icon className="h-5 w-5" />}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {item.title}
                </p>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {item.value}
                </h3>
              </div>
            </Card.Content>

            {/* subtle glow (dark only) */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 dark:block hidden">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
