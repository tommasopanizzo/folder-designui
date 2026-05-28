"use client";

import { FolderItemMedia } from "@/components/folder-item-media";
import { cn, type FolderItem } from "@/lib/utils";
import { useState, type CSSProperties, type ReactNode } from "react";

function FileIconOne({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function FileIconTwo({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function FileIconThree({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8" />
    </svg>
  );
}

const files = [
  { id: 1, bg: "#E0E7FF", stroke: "#6366F1", icon: FileIconOne, zIndex: 11, delay: "20ms" },
  { id: 2, bg: "#FEF3C7", stroke: "#D97706", icon: FileIconTwo, zIndex: 12, delay: "0ms" },
  { id: 3, bg: "#DCFCE7", stroke: "#16A34A", icon: FileIconThree, zIndex: 13, delay: "40ms" },
];

export type FolderMode = "inside" | "hover" | "cards";

export type FolderProps = {
  mode: FolderMode;
  items?: FolderItem[];
  renderItem?: (item: FolderItem, index: number) => ReactNode;
  innerContent?: ReactNode;
  /** Simulate hover/open (touch). When set, ignores mouse enter/leave. */
  forceOpen?: boolean;
  compact?: boolean;
  className?: string;
  folderColor?: string;
  hideTab?: boolean;
};

export function Folder({
  mode,
  items = [],
  renderItem,
  innerContent,
  compact = false,
  className,
  folderColor = "",
  hideTab = false,
  forceOpen,
}: FolderProps) {
  const animated = mode === "cards";
  const showInnerPreview = mode === "inside";
  const showCardIconPreview = mode === "cards";
  const [internalOpen, setInternalOpen] = useState(false);
  const open = forceOpen ?? internalOpen;
  const usePointerHover = forceOpen === undefined;
  const baseBackColor = folderColor || "#F5A623";
  const baseFrontColor = folderColor || "#F0B429";
  const width = compact ? 48 : 96;
  const height = compact ? 40 : 80;

  const containerStyle: CSSProperties = {
    width,
    height,
    perspective: compact ? 400 : 800,
    cursor: "pointer",
  };

  const clamped = Math.max(0, Math.min(3, items.length));
  const visibleIndexes =
    clamped === 0 ? [] : clamped === 1 ? [1] : clamped === 2 ? [0, 2] : [0, 1, 2];
  const innerVisible = items.slice(0, 7);
  const innerOverflow = Math.max(0, items.length - 7);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={containerStyle}
      onMouseEnter={() => usePointerHover && animated && setInternalOpen(true)}
      onMouseLeave={() => usePointerHover && animated && setInternalOpen(false)}
    >
      <div style={{ position: "absolute", inset: 0, background: baseBackColor, borderRadius: "0 10px 10px 10px" }}>
        {!hideTab ? (
          <div
            style={{
              position: "absolute",
              top: -13,
              left: 0,
              width: 36,
              height: 14,
              background: baseBackColor,
              borderRadius: "6px 6px 0 0",
            }}
          />
        ) : null}
      </div>

      {visibleIndexes.map((fileIndex, previewIndex) => {
        const file = files[fileIndex];
        if (!file) return null;
        const item = items[previewIndex];
        const transforms = [
          open ? "translateX(-34px) translateY(-36px) rotate(-20deg)" : "none",
          open ? "translateY(-40px) rotate(0deg)" : "none",
          open ? "translateX(34px) translateY(-36px) rotate(20deg)" : "none",
        ];
        const Icon = file.icon;

        return (
          <div
            key={`${file.id}-${fileIndex}`}
            style={{
              position: "absolute",
              width: compact ? 22 : 42,
              height: compact ? 30 : 54,
              borderRadius: 5,
              left: "50%",
              marginLeft: compact ? -11 : -21,
              top: compact ? 6 : 10,
              background: file.bg,
              border: "1px solid rgba(0,0,0,0.06)",
              zIndex: file.zIndex,
              transformOrigin: "bottom center",
              transform: compact || !animated ? "none" : transforms[fileIndex],
              transition: animated ? `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${file.delay}` : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {showCardIconPreview && item ? (
              <FolderItemMedia item={item} renderItem={renderItem} index={previewIndex} width={20} height={20} imgClassName="size-5 rounded-sm object-cover" />
            ) : (
              <Icon stroke={file.stroke} />
            )}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "82%",
          background: baseFrontColor,
          borderRadius: 10,
          transformOrigin: "bottom center",
          transform: animated && open ? "rotateX(-35deg)" : "rotateX(0deg)",
          transition: animated ? "transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          zIndex: 20,
        }}
      >
        {showInnerPreview && (innerContent || items.length > 0) ? (
          innerContent ? (
            <div className="absolute inset-x-2 top-4 bottom-2 overflow-hidden">{innerContent}</div>
          ) : (
            <div className="absolute inset-x-2 top-4 bottom-2 flex flex-wrap content-start gap-1 overflow-hidden">
              {innerVisible.map((item, index) => (
                <span key={index} className="flex size-4 items-center justify-center rounded-sm border border-black/10 bg-white/90">
                  <FolderItemMedia item={item} renderItem={renderItem} index={index} />
                </span>
              ))}
              {innerOverflow > 0 ? (
                <span className="flex size-4 items-center justify-center rounded-sm bg-black/75 text-[9px] font-semibold text-white">
                  +{innerOverflow}
                </span>
              ) : null}
            </div>
          )
        ) : null}
        <div style={{ position: "absolute", top: 9, left: 9, right: 9, height: 1.5, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
      </div>
    </div>
  );
}
