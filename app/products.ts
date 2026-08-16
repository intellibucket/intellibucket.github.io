export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  status: "Available" | "In development";
  index: string;
  accent: "lime" | "blue" | "orange" | "pink" | "ice";
};

export const products: Product[] = [
  {
    slug: "alwaysawake",
    name: "Always Awake",
    eyebrow: "A quiet screen utility",
    tagline: "Your screen stays on. You stay in flow.",
    summary:
      "Keep your display available for recipes, workouts, demos, reading, and every moment when screen timeout gets in the way.",
    status: "Available",
    index: "01",
    accent: "lime",
  },
  {
    slug: "ymessage",
    name: "YMessage",
    eyebrow: "A new way to keep in touch",
    tagline: "Messaging, with less noise around it.",
    summary:
      "A focused communication product being shaped around the conversations that actually matter.",
    status: "In development",
    index: "02",
    accent: "blue",
  },
  {
    slug: "mydocthings",
    name: "MyDocThings",
    eyebrow: "Documents without the hunt",
    tagline: "The important things, findable.",
    summary:
      "A calmer home for the documents and details you need to keep close, without turning life into admin.",
    status: "In development",
    index: "03",
    accent: "orange",
  },
  {
    slug: "bucketsecure",
    name: "BucketSecure",
    eyebrow: "Everyday digital privacy",
    tagline: "Protection that stays out of the way.",
    summary:
      "A security utility in development for people who want stronger digital habits without extra complexity.",
    status: "In development",
    index: "04",
    accent: "pink",
  },
  {
    slug: "readworks",
    name: "ReadWorks",
    eyebrow: "A focused reading space",
    tagline: "Give good words your full attention.",
    summary:
      "A reading product being built for less clutter, better focus, and ideas worth returning to.",
    status: "In development",
    index: "05",
    accent: "ice",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
