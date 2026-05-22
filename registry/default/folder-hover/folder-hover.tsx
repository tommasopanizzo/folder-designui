"use client";

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
