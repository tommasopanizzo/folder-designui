# folder-designui

Animated folder previews for React — [live demo](https://folder-designui.vercel.app).

## Preview modes

| Package | Behavior |
| --- | --- |
| `@chumy/folder-inside` | Icons or custom content on the **front flap** (up to 7 items + overflow). |
| `@chumy/folder-hover` | Folder stays still; a **popover** lists your items on hover (desktop) or when you tap **Simulate hover** (touch). |
| `@chumy/folder-cards` | **Cards** slide out of the folder on hover / simulate. |

On the demo site, hover a column (or use **Simulate hover** on phone/tablet) and click the `@chumy/folder-*` line to copy the install command.

## Install

One-time registry setup:

```bash
npx shadcn@latest registry add @chumy=https://folder-designui.vercel.app/r/{name}.json
```

Then add the variant you need:

```bash
npx shadcn@latest add @chumy/folder-inside
npx shadcn@latest add @chumy/folder-hover
npx shadcn@latest add @chumy/folder-cards
```

## What you can put inside a folder

All variants accept an `items` array. Each item can be:

### 1. Link / website (favicon)

Use a URL; the component loads a favicon via Google’s favicon service, with a letter fallback.

```tsx
import { FolderInside } from "@/components/folder-inside";
import { itemFromUrl } from "@/lib/utils";

<FolderInside
  items={[
    itemFromUrl("https://github.com/your-org", "GH"),
    itemFromUrl("https://www.notion.so", "Notion"),
  ]}
/>
```

### 2. Image

```tsx
items={[
  { src: "/logos/design.png", alt: "Design", fallback: "/logos/design-fallback.png" },
]}
```

### 3. Any React node

```tsx
items={[
  { content: <span className="text-lg">📁</span> },
  { content: <YourBadge label="API" /> },
]}
```

### 4. Custom render per item

```tsx
<FolderHover
  items={myItems}
  renderItem={(item, index) => (
    <a href={item.href} className="block size-6 rounded-sm bg-muted" />
  )}
/>
```

### Inside only: free layout on the flap

`innerContent` replaces the default icon grid with your own layout (text, stacks, buttons, etc.):

```tsx
<FolderInside
  innerContent={
    <div className="flex flex-col gap-1 p-2 text-[10px]">
      <span className="font-semibold">Q4</span>
      <span className="text-muted-foreground">12 files</span>
    </div>
  }
/>
```

You can combine `innerContent` with `items` depending on how you compose the base `Folder` component.

## Other props

- `folderColor` — back/front flap color (hex).
- `compact` — smaller folder for dense UIs.
- `hideTab` — hide the tab on the folder.
- `forceOpen` — keep cards open (e.g. touch “Simulate hover” in your app).
- `className` — wrapper styling.

## License

MIT — see [LICENSE](./LICENSE).

## Support

If this helped your project, you can [buy me a coffee](https://buymeacoffee.com/chumy).
