import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "../../policy-page";
import { getProduct, products } from "../../products";

type Props = { params: Promise<{ product: string }> };
export function generateStaticParams() { return products.map(({ slug }) => ({ product: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).product);
  return product ? { title: `Terms & Conditions — ${product.name}`, description: `Terms and conditions for ${product.name}.`, alternates: { canonical: `/${product.slug}/terms` } } : {};
}

export default async function Terms({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();
  const development = product.status === "In development";
  return <PolicyPage product={product} label="Terms & conditions" intro={development ? `${product.name} is still in development. These terms are a pre-release framework and will be updated before the product becomes available.` : `These terms govern your use of ${product.name}. By downloading or using the product, you agree to use it responsibly and in line with these terms.`} sections={[
    { title: "Using the product", paragraphs: [`Intellibucket grants you a limited, personal, non-exclusive, non-transferable, and revocable right to use ${product.name} for its intended purpose, subject to these terms and the rules of the store where you obtained it.`] },
    { title: "Responsible use", paragraphs: ["You may not misuse the product, interfere with its operation, attempt unauthorized access, reverse engineer it where prohibited by law, or use it to violate the rights of others."] },
    { title: "Availability and changes", paragraphs: [development ? "The product is not yet generally available. Features, platforms, timing, and the product name may change during development." : "Features may be improved, changed, suspended, or discontinued. Intellibucket aims to keep the product reliable but does not promise uninterrupted or error-free availability."] },
    { title: "Third-party services", paragraphs: ["The product may rely on operating systems, app stores, device features, or other third-party services. Their availability and rules are outside Intellibucket’s control and may be governed by separate terms."] },
    { title: "No warranties", paragraphs: ["To the extent permitted by law, the product is provided on an “as is” and “as available” basis. Nothing in these terms limits consumer rights that cannot legally be excluded."] },
    { title: "Liability", paragraphs: ["To the extent permitted by law, Intellibucket is not liable for indirect, incidental, special, or consequential loss resulting from use of or inability to use the product."] },
    { title: "Changes and contact", paragraphs: ["These terms may be updated as the product evolves or legal requirements change. Questions can be sent to legal@intellibucket.com."] },
  ]} />;
}
