import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function faviconUrlForWebsite(url: string) {
  try {
    const host = new URL(url).hostname;
    if (!host) return "";
    return `https://www.google.com/s2/favicons?${new URLSearchParams({ domain: host, sz: "64" })}`;
  } catch {
    return "";
  }
}

export function fallbackIcon(seed: string) {
  const letter = (seed.trim().charAt(0) || "?").toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' rx='12' fill='#e5e7eb'/><text x='32' y='41' text-anchor='middle' font-size='30' fill='#374151'>${letter}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export type FolderItem = {
  src?: string;
  fallback?: string;
  alt?: string;
  content?: ReactNode;
};

export function itemFromUrl(url: string, label: string): FolderItem {
  return { src: faviconUrlForWebsite(url), fallback: fallbackIcon(label), alt: label };
}

export const demoFolderItems: FolderItem[] = [
  itemFromUrl("https://github.com", "GitHub"),
  itemFromUrl("https://www.notion.so", "Notion"),
  itemFromUrl("https://www.figma.com", "Figma"),
  itemFromUrl("https://linear.app", "Linear"),
  itemFromUrl("https://slack.com", "Slack"),
  itemFromUrl("https://vercel.com", "Vercel"),
];
