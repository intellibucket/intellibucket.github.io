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

  if (product.slug === "alwaysawake") {
    return <PolicyPage product={product} label="Privacy policy" intro={`Always Awake ("the App") is developed by Bucket Studio. This Privacy Policy explains what data the App accesses, how it is used, and your choices regarding that data.`} sections={[
      { title: "Data the App accesses", paragraphs: ["The App accesses the following information on your device:", "Overlay permission — Used to display a transparent overlay that keeps the screen on. No content is drawn or captured from other apps.", "System screen timeout setting — Temporarily modified when the fallback wake engine is active. The original value is restored when the session ends.", "Installed app list — Read to populate the app picker for per-app trigger rules. This data is processed entirely on-device and is never transmitted externally.", "Foreground app information — Used to detect when a selected app enters the foreground, triggering the wake session.", "Wi-Fi SSID — Read to match Wi-Fi-based trigger rules. Used only when the user creates a Wi-Fi rule.", "Bluetooth device names and addresses — Read to list paired devices for Bluetooth trigger rules. Used only when the user creates a Bluetooth rule.", "Battery status — Monitored to end sessions when battery is low (if enabled) and to trigger charge-based rules."] },
      { title: "How data is used", paragraphs: ["All data listed above is processed entirely on your device. The App does not transmit, collect, or share any of this data with external servers. There is no analytics, advertising, or crash reporting SDK in the App."] },
      { title: "In-App purchases", paragraphs: ["The App offers a one-time Premium purchase. Payment is processed entirely by Google Play. The App does not have access to your payment information, credit card number, or Google account details. Purchase status is stored locally on your device to remember your Premium tier."] },
      { title: "Data storage", paragraphs: ["All App settings, rules, and purchase status are stored locally on your device using Android SharedPreferences. No data is sent to any server."] },
      { title: "Third-party services", paragraphs: ["The App uses the following Google services:", "Google Play Billing — For processing the one-time Premium purchase. Subject to Google's Privacy Policy."] },
      { title: "Children's privacy", paragraphs: ["The App is not directed at children under the age of 13. The App does not knowingly collect personal information from children."] },
      { title: "Changes to this policy", paragraphs: ["This Privacy Policy may be updated from time to time. Changes will be reflected in the App and on this page with an updated date."] },
      { title: "Contact", paragraphs: ["If you have questions about this Privacy Policy, contact us at: bucketstudio@proton.me"] },
      { title: "Deleting your data", paragraphs: ["To remove all data stored by the App, simply uninstall the App or clear the App's data from Android Settings. All preferences, rules, and purchase cache will be removed from your device."] },
    ]} />;
  }

  const development = product.status === "In development";
  return <PolicyPage product={product} label="Privacy policy" intro={development ? `This pre-release notice explains how privacy will be approached as ${product.name} is developed. It will be updated with final, product-specific details before release.` : `This policy explains how ${product.name} and its related website handle information. The product is designed to do its job with as little data as practical.`} sections={[
    { title: "Scope", paragraphs: [`This policy applies to ${product.name}, its product page, and support conversations with IntelliBucket. Store platforms and operating-system providers have their own terms and privacy practices.`] },
    { title: "Information handled", paragraphs: [development ? `${product.name} is not publicly released. No production account or product usage data is currently collected through this page.` : `${product.name} does not require an IntelliBucket account for its core utility. Settings needed to provide the experience may be stored on your device.`, "When you visit this website, hosting infrastructure may process standard technical information such as IP address, browser type, requested page, and time of access for security and reliability."] },
    { title: "How information is used", paragraphs: ["Information is used only to operate, protect, support, and improve the relevant product or website. IntelliBucket does not sell personal information."] },
    { title: "Sharing and retention", paragraphs: ["Information may be handled by service providers that run essential infrastructure, subject to their contractual and legal obligations. Information is kept only as long as reasonably needed for the purpose it was collected or as required by law."] },
    { title: "Your choices", paragraphs: ["You can remove locally stored product data by using available in-app controls or uninstalling the app. You may contact IntelliBucket to ask a privacy question or request action regarding information you have provided directly."] },
    { title: "Changes", paragraphs: ["This policy may change as the product develops, new features are added, or legal requirements evolve. The date at the top of this page will show the latest revision."] },
    { title: "Contact", paragraphs: ["Privacy questions can be sent to privacy@intellibucket.com."] },
  ]} />;
}
