import { FolderItemMedia } from "@/components/folder-item-media";
import { cn, type FolderItem } from "@/lib/utils";
import type { ReactNode } from "react";

export function FolderHoverPopover({
  items,
  renderItem,
  maxVisible = 8,
  caret = "top",
  className,
}: {
  items: FolderItem[];
  renderItem?: (item: FolderItem, index: number) => ReactNode;
  maxVisible?: number;
  caret?: "top" | "bottom";
  className?: string;
}) {
  if (items.length === 0) return null;
  const visible = items.slice(0, maxVisible);
  const overflow = Math.max(0, items.length - maxVisible);

  return (
    <div
      className={cn(
        "relative w-fit min-w-[150px] max-w-[220px] rounded-xl border border-neutral-200 bg-white p-3 shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 size-4 -translate-x-1/2 rotate-45 bg-white",
          caret === "top"
            ? "-top-2 border-t border-l border-neutral-200"
            : "-bottom-2 border-b border-r border-neutral-200",
        )}
      />
      <div className="flex flex-wrap justify-center gap-2">
        {visible.map((item, i) => (
          <span
            key={i}
            className="flex size-6 items-center justify-center rounded-sm border border-neutral-200 bg-white p-0.5"
          >
            <FolderItemMedia
              item={item}
              renderItem={renderItem}
              index={i}
              width={20}
              height={20}
              imgClassName="size-5 rounded-sm object-cover"
            />
          </span>
        ))}
        {overflow > 0 ? <p className="text-xs text-neutral-600">+{overflow}</p> : null}
      </div>
    </div>
  );
}
