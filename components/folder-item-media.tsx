import type { FolderItem } from "@/lib/utils";
import type { ReactNode } from "react";

export function FolderItemMedia({
  item,
  renderItem,
  index,
  width = 12,
  height = 12,
  imgClassName = "rounded-[2px] object-cover",
}: {
  item: FolderItem;
  renderItem?: (item: FolderItem, index: number) => ReactNode;
  index: number;
  width?: number;
  height?: number;
  imgClassName?: string;
}) {
  if (renderItem) return <>{renderItem(item, index)}</>;
  if (item.content != null) return <>{item.content}</>;
  if (!item.src && !item.fallback) return null;

  return (
    <img
      src={item.src || item.fallback}
      data-fallback={item.fallback}
      alt={item.alt ?? ""}
      width={width}
      height={height}
      className={imgClassName}
      draggable={false}
      onError={(e) => {
        const fb = e.currentTarget.dataset.fallback;
        if (fb && e.currentTarget.src !== fb) e.currentTarget.src = fb;
      }}
    />
  );
}
