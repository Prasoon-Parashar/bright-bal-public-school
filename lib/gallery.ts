/** Shared helpers for the gallery (admin + website). Save as: lib/gallery.ts */

/* IMPORTANT: this must match your Supabase Storage bucket name */
export const GALLERY_BUCKET = "gallery";

export type GalleryRow = {
  id: string | number;
  title: string | null;
  image_url: string;
  category: string | null;
  description?: string | null;
  image_title?: string | null;
  image_description?: string | null;
  created_at?: string | null;
};

export type Collection = {
  key: string;
  title: string;
  category: string;
  description: string;
  photos: GalleryRow[];
  cover: string;
};

export type CategoryInfo = { key: string; name: string; count: number };

/** Photos with the same title + category become one collection.
 *  Rows are expected newest-first, so newest collections come first. */
export function groupCollections(rows: GalleryRow[]): Collection[] {
  const map = new Map<string, Collection>();

  for (const r of rows) {
    const category = (r.category ?? "").trim() || "General";
    const title = (r.title ?? "").trim() || (r.category ?? "").trim() || "Untitled";
    const key = `${title.toLowerCase()}|${category.toLowerCase()}`;

    let c = map.get(key);
    if (!c) {
      c = { key, title, category, description: "", photos: [], cover: r.image_url };
      map.set(key, c);
    }
    if (!c.description && r.description?.trim()) c.description = r.description.trim();
    c.photos.push(r);
  }

  return [...map.values()];
}

/** Unique categories (case-insensitive) with number of collections in each. */
export function categoriesOf(collections: Collection[]): CategoryInfo[] {
  const map = new Map<string, CategoryInfo>();
  for (const c of collections) {
    const key = c.category.toLowerCase();
    const found = map.get(key);
    if (found) found.count += 1;
    else map.set(key, { key, name: c.category, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Turns a public image URL back into its storage path (for deleting files). */
export function storagePathFromUrl(url: string): string | null {
  const marker = `/${GALLERY_BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + marker.length).split("?")[0]);
}