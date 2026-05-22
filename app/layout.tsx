import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { ProjectTopbar } from "@/components/project-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folder Design UI — @chumy",
  description: "Inside, Hover, Cards. Install with npx shadcn add @chumy/folder-*",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="flex min-h-full flex-col antialiased">
        <ProjectTopbar />
        <div className="flex-1 pt-16 sm:pt-[4.25rem]">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
