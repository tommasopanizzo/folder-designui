export const SITE_URL = "https://folder-designui.vercel.app";
export const CHUMY_REGISTRY_URL = `${SITE_URL}/r/{name}.json`;

export type FolderModeId = "inside" | "hover" | "cards";

export function folderInstallCommand(mode: FolderModeId) {
  return `npx shadcn@latest add @chumy/folder-${mode}`;
}

export const REGISTRY_SETUP_COMMAND =
  `npx shadcn@latest registry add @chumy=${CHUMY_REGISTRY_URL}`;
