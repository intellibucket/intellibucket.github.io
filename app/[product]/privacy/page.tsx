import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "../../policy-page";
import { getProduct, products } from "../../products";

type Props = { params: Promise<{ product: string }> };
export function generateStaticParams() { return products.map(({ slug }) => ({ product: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).product);
  return product ? { title: `Privacy Policy — ${product.name}`, description: `Privacy information for ${product.name}.`, alternates: { canonical: `/${product.slug}/privacy` } } : {};
}

export default async function Privacy({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();
  const development = product.status === "In development";
  return <PolicyPage product={product} label="Privacy policy" intro={development ? `This pre-release notice explains how privacy will be approached as ${product.name} is developed. It will be updated with final, product-specific details before release.` : `This policy explains how ${product.name} and its related website handle information. The product is designed to do its job with as little data as practical.`} sections={[
    { title: "Scope", paragraphs: [`This policy applies to ${product.name}, its product page, and support conversations with Intellibucket. Store platforms and operating-system providers have their own terms and privacy practices.`] },
    { title: "Information handled", paragraphs: [development ? `${product.name} is not publicly released. No production account or product usage data is currently collected through this page.` : `${product.name} does not require an Intellibucket account for its core utility. Settings needed to provide the experience may be stored on your device.`, "When you visit this website, hosting infrastructure may process standard technical information such as IP address, browser type, requested page, and time of access for security and reliability."] },
    { title: "How information is used", paragraphs: ["Information is used only to operate, protect, support, and improve the relevant product or website. Intellibucket does not sell personal information."] },
    { title: "Sharing and retention", paragraphs: ["Information may be handled by service providers that run essential infrastructure, subject to their contractual and legal obligations. Information is kept only as long as reasonably needed for the purpose it was collected or as required by law."] },
    { title: "Your choices", paragraphs: ["You can remove locally stored product data by using available in-app controls or uninstalling the app. You may contact Intellibucket to ask a privacy question or request action regarding information you have provided directly."] },
    { title: "Changes", paragraphs: ["This policy may change as the product develops, new features are added, or legal requirements evolve. The date at the top of this page will show the latest revision."] },
    { title: "Contact", paragraphs: ["Privacy questions can be sent to privacy@intellibucket.com."] },
  ]} />;
}
