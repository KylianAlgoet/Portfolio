import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

type Draftable = { data: { draft?: boolean } };

// Drafts show up in `astro dev` so they can be worked on, but never in a production build.
const isVisible = (entry: Draftable) => !import.meta.env.PROD || !entry.data.draft;

export async function getPublished<C extends CollectionKey>(collection: C): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection);
  return entries.filter((entry) => isVisible(entry as Draftable));
}

export async function getWork() {
  const work = await getPublished("work");
  return work.sort((a, b) => a.data.order - b.data.order);
}

export async function getPlayground() {
  const items = await getPublished("playground");
  return items.sort((a, b) => a.data.order - b.data.order);
}
