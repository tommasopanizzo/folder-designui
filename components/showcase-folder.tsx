"use client";

import { Folder } from "@/components/folder";
import { FolderHoverPopover } from "@/components/folder-hover-popover";
import { folderInstallCommand, type FolderModeId } from "@/lib/registry-commands";
import { usePointerEnvironment } from "@/lib/use-fine-pointer";
import { cn, type FolderItem } from "@/lib/utils";
import { Check, Copy, Pointer } from "lucide-react";
import { useState } from "react";

const FOLDER_SLOT_H = 108;

function CopyInstallButton({
  command,
  label,
  copied,
  onCopy,
  className,
  alwaysVisible = false,
}: {
  command: string;
  label: string;
  copied: boolean;
  onCopy: (e: React.MouseEvent) => void;
  className?: string;
  alwaysVisible?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      title={command}
      className={cn(
        "mx-auto flex max-w-[220px] items-center justify-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] text-muted-foreground transition",
        alwaysVisible
          ? "opacity-100 hover:bg-muted hover:text-foreground"
          : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-muted hover:text-foreground",
        copied && "opacity-100 text-foreground",
        className,
      )}
    >
      {copied ? <Check className="size-3 shrink-0" /> : <Copy className="size-3 shrink-0" />}
      <span className="truncate">{label}</span>
    </button>
  );
}

export function ShowcaseFolder({
  mode,
  label,
  items,
  folderColor = "#F5A623",
}: {
  mode: FolderModeId;
  label: string;
  items: FolderItem[];
  folderColor?: string;
}) {
  const { ready, isDesktop, isTouch } = usePointerEnvironment();
  const [copied, setCopied] = useState(false);
  const [pointerHover, setPointerHover] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const command = folderInstallCommand(mode);
  const installLabel = `@chumy/folder-${mode}`;

  const active = isDesktop ? pointerHover : simulated;
  const showSimulateButton = ready && isTouch && (mode === "hover" || mode === "cards");
  const forceOpen = mode === "cards" ? active : undefined;
  const showPopover = mode === "hover" && active && items.length > 0;

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className="group relative mx-auto flex w-full max-w-[220px] flex-col items-center text-center"
      onMouseEnter={() => isDesktop && setPointerHover(true)}
      onMouseLeave={() => isDesktop && setPointerHover(false)}
    >
      <div
        className="relative flex w-[112px] items-end justify-center"
        style={{ height: FOLDER_SLOT_H }}
      >
        {showPopover ? (
          <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2">
            <FolderHoverPopover items={items} caret="bottom" />
          </div>
        ) : null}
        <Folder mode={mode} items={items} folderColor={folderColor} forceOpen={forceOpen} />
      </div>

      <p className="mt-4 w-full text-center text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>

      {showSimulateButton ? (
        <button
          type="button"
          onClick={() => setSimulated((v) => !v)}
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition",
            simulated ? "border-foreground bg-foreground text-background" : "hover:bg-muted",
          )}
        >
          <Pointer className="size-3.5" />
          {simulated ? "Close preview" : "Simulate hover"}
        </button>
      ) : null}

      <CopyInstallButton
        command={command}
        label={installLabel}
        copied={copied}
        onCopy={copy}
        alwaysVisible={isTouch}
        className="mt-2"
      />
    </div>
  );
}
