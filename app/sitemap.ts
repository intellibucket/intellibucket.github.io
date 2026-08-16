import type { MetadataRoute } from "next";
import { products } from "./products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://intellibucket.com";
  const productPages = products.flatMap((product) => [
    { url: `${base}/${product.slug}`, changeFrequency: "monthly" as const, priority: product.status === "Available" ? 0.9 : 0.6 },
    { url: `${base}/${product.slug}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/${product.slug}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
  ]);
  return [{ url: base, changeFrequency: "weekly", priority: 1 }, ...productPages];
}
