import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://folder-designui.vercel.app";

const presets = [
  { name: "folder-inside", mode: "inside", title: "Folder Inside", description: "Icons on the folder front flap." },
  { name: "folder-hover", mode: "hover", title: "Folder Hover", description: "Static folder + hover popover." },
  { name: "folder-cards", mode: "cards", title: "Folder Cards", description: "Opens on hover; three cards fly out." },
];

function pascal(slug) {
  return slug.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
}

function presetSource(preset) {
  if (preset.mode === "hover") {
    return `"use client";

import type { ComponentProps } from "react";
import { useState } from "react";
import { Folder } from "@/components/folder";
import { FolderHoverPopover } from "@/components/folder-hover-popover";
import { cn } from "@/lib/utils";

export function FolderHover(props: Omit<ComponentProps<typeof Folder>, "mode"> & { className?: string }) {
  const { className, items = [], ...rest } = props;
  const [hovered, setHovered] = useState(false);
  return (
    <div className={cn("relative flex min-h-[200px] flex-col items-center", className)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative flex w-[112px] flex-col items-center pt-4">
        <Folder mode="hover" items={items} {...rest} />
      </div>
      {hovered && items.length > 0 ? <FolderHoverPopover items={items} renderItem={rest.renderItem} /> : null}
    </div>
  );
}
`;
  }
  const exportName = pascal(preset.name);
  return `"use client";

import type { ComponentProps } from "react";
import { Folder } from "@/components/folder";

export function ${exportName}(props: Omit<ComponentProps<typeof Folder>, "mode">) {
  return <Folder mode="${preset.mode}" {...props} />;
}
`;
}

const presetItems = [];
const defaultDir = path.join(root, "registry", "default");
fs.rmSync(defaultDir, { recursive: true, force: true });

for (const preset of presets) {
  const fileName = preset.mode === "hover" ? "folder-hover.tsx" : `${preset.name}.tsx`;
  const dir = path.join(defaultDir, preset.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), presetSource(preset));
  presetItems.push({
    name: preset.name,
    type: "registry:component",
    title: preset.title,
    description: preset.description,
    registryDependencies: ["@chumy/folder"],
    dependencies: ["clsx", "tailwind-merge"],
    categories: ["folder"],
    files: [{ path: `registry/default/${preset.name}/${fileName}`, type: "registry:component" }],
  });
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "chumy",
  homepage: "https://github.com/tommasopanizzo/folder-designui",
  items: [
    {
      name: "folder",
      type: "registry:ui",
      title: "Folder",
      description: "Animated folder. Pass items (images or custom React).",
      dependencies: ["clsx", "tailwind-merge"],
      categories: ["folder"],
      files: [
        { path: "components/folder.tsx", type: "registry:ui" },
        { path: "components/folder-item-media.tsx", type: "registry:ui" },
        { path: "components/folder-hover-popover.tsx", type: "registry:ui" },
        { path: "lib/utils.ts", type: "registry:lib" },
      ],
    },
    ...presetItems,
  ],
};

fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
console.log("OK: registry.json + 3 presets");
