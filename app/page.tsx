"use client";

import { ShowcaseFolder } from "@/components/showcase-folder";
import { demoFolderItems } from "@/lib/utils";

const MODES = [
  { mode: "inside" as const, label: "Inside" },
  { mode: "hover" as const, label: "Hover" },
  { mode: "cards" as const, label: "Cards" },
];

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4.25rem)] items-center justify-center bg-[linear-gradient(to_bottom,#fbfbfb,#f5f5f5)] px-6 py-16 dark:bg-[linear-gradient(to_bottom,#171717,#121212)]">
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 justify-items-center gap-16 sm:grid-cols-3 sm:gap-8">
        {MODES.map((entry) => (
          <ShowcaseFolder
            key={entry.mode}
            mode={entry.mode}
            label={entry.label}
            items={demoFolderItems}
            folderColor="#F5A623"
          />
        ))}
      </div>
    </main>
  );
}
