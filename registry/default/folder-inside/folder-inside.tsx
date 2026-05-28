"use client";

import type { ComponentProps } from "react";
import { Folder } from "@/components/folder";

export function FolderInside(props: Omit<ComponentProps<typeof Folder>, "mode">) {
  return <Folder mode="inside" {...props} />;
}
