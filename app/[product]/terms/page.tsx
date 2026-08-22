import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "../../policy-page";
import { getProduct, products } from "../../products";

type Props = { params: Promise<{ product: string }> };
export function generateStaticParams() {
  return products.map(({ slug }) => ({ product: slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).product);
  return product ? { title: `Terms & Conditions — ${product.name}`, description: `Terms and conditions for ${product.name}.`, alternates: { canonical: `/${product.slug}/terms` } } : {};
}

const ALWAYS_AWAKE_CONTACT = "mammadli.vugar@hotmail.com";

export default async function Terms({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();

  if (product.slug === "alwaysawake") {
    return <PolicyPage
      product={product}
      label="Terms & conditions"
      updated="22 August 2026"
      intro={`These terms cover your use of Always Awake ("the App"), published by IntelliBucket. They explain what you are allowed to do with the App, what the one-time Premium purchase gets you, and — just as importantly — the limits of what a screen-timeout utility can promise on Android.`}
      sections={[

        { title: "Agreeing to these terms", paragraphs: [
          "By installing or using the App you accept these terms. If you do not accept them, do not install the App, or uninstall it.",
          "The App is distributed through Google Play, so Google Play's own terms apply to the download and to any purchase alongside these terms. Where Google Play's terms govern the transaction itself — payment, refunds, your account — those terms take precedence over anything here.",
          "Nothing in these terms removes rights that consumer law in your country gives you and does not allow to be waived.",
        ] },

        { title: "The licence you get", paragraphs: [
          "IntelliBucket grants you a personal, non-exclusive, non-transferable, revocable licence to install and use the App on devices you control, for its intended purpose.",
          "You do not buy the software itself. Premium unlocks features inside the App; it does not transfer ownership, source code, or any intellectual property.",
          "You may not resell, rent, sublicense, or redistribute the App, and you may not reverse engineer, decompile, or modify it except where that is expressly permitted by law that cannot be overridden by contract.",
        ] },

        { title: "What the App does", paragraphs: [
          "The App keeps your device's display awake — either because you started a session by hand, or because an automation rule you created matched. It ends the session when you stop it, when the time you chose runs out, when you unplug, or when the battery guard threshold is reached.",
          "It does this using Android's own mechanisms: an invisible overlay window, or, if you decline that permission, by temporarily extending the system screen-timeout value and restoring it afterwards.",
          "The App is a convenience utility. It is not a safety, medical, industrial, or monitoring product, and it should not be relied on where a screen turning off could cause harm or loss.",
        ] },

        { title: "What the App depends on — and cannot guarantee", paragraphs: [
          "Keeping a screen on for a long period is something the operating system can override. IntelliBucket cannot promise a session will never be interrupted, because the decision is not always the App's to make.",
          "In particular: many manufacturers ship aggressive battery managers that stop background services; Android's Doze and battery-saver modes can end a session; the system may kill the App under memory pressure; and revoking a permission at any point disables the feature that needed it.",
          "Sessions may also end for reasons you configured — a timeout, unplugging, or the battery guard — and that is intended behaviour, not a fault.",
          "Where the operating system allows it, the App tries to recover: it can restore a session after a restart if you enable that option, and it reconciles its state whenever it is opened. It cannot guarantee recovery in every case.",
          "Keeping the display on uses more battery than letting it sleep. That is inherent to what the App does, not a defect.",
        ] },

        { title: "Permissions you choose to grant", paragraphs: [
          "Several features need Android permissions that only you can grant, and the App asks for each one at the moment the feature is first used, after explaining why.",
          "Declining a permission is always allowed. It disables only the feature that needed it — the rest of the App continues to work, and the overlay engine has a lighter fallback if you prefer not to grant it.",
          "You can review or revoke every permission at any time, from the App's Permissions screen or from Android system settings. Revoking a permission that a rule depends on will stop that rule from firing.",
          "What each permission is used for is set out in the Privacy Policy.",
        ] },

        { title: "Free features and Premium", paragraphs: [
          "The App is free to install. The free tier includes manual and timed sessions, keeping the screen on until you unplug, the battery guard, the Quick Settings tile, the home-screen widget, theme and language options, and one automation rule.",
          "Premium is a single one-time purchase that unlocks unlimited automation rules, per-app rules, Bluetooth and headphone triggers, Wi-Fi network triggers, scheduled rules, and widget theme customisation.",
          "There is no subscription, no recurring charge, and no advertising in either tier.",
          "Features that are part of Premium at the time you buy stay unlocked for you. If the split between free and Premium changes later, that change applies to what is offered to new users, not to features you have already paid for.",
        ] },

        { title: "Payment, refunds and restoring your purchase", paragraphs: [
          "All payments are processed by Google Play. IntelliBucket never receives or stores your card details, billing address, or Google account credentials.",
          "The price shown in the App is the price Google Play reports for your country and currency, including any taxes Google collects on your behalf.",
          "Refunds are handled under Google Play's refund policy. Google's own automatic refund window applies first; after it, a refund request reaches IntelliBucket and will be considered in good faith, and always subject to any statutory right of withdrawal you have.",
          "Premium is tied to the Google account that bought it, not to a device. Reinstalling the App or moving to a new phone does not require paying again — use Restore purchase, and Google Play re-confirms the entitlement.",
          "If a purchase is refunded, charged back, or revoked, Premium features lock again the next time the App checks with Google Play. Rules and settings you created are kept, not deleted.",
          "Premium is a one-time purchase for the current App. It does not entitle you to other IntelliBucket products.",
        ] },

        { title: "How you may use the App", paragraphs: [
          "Use the App on your own devices, or on devices you are authorised to configure.",
          "Do not use it to interfere with, disable, or circumvent security features of a device you do not control, and do not use it in a way that breaks the law where you are.",
          "Do not attempt to bypass the Premium purchase, tamper with the entitlement stored on your device, or distribute modified copies of the App.",
        ] },

        { title: "Availability, updates and discontinuation", paragraphs: [
          "The App may be updated to fix defects, follow changes in Android, or add features. Updates are delivered through Google Play under its normal update rules.",
          "Features may be changed, improved, or removed where a platform change makes them impossible to support. Where a removal affects a Premium feature you paid for, IntelliBucket will say so clearly in the release notes.",
          "IntelliBucket may stop publishing the App. If that happens, copies already installed keep working for as long as the operating system allows, but updates and support end.",
        ] },

        { title: "Third-party services", paragraphs: [
          "The App relies on Android and on Google Play Billing. Their behaviour, availability, and terms are outside IntelliBucket's control.",
          "The App opens one external link — the Privacy Policy — in your browser. IntelliBucket is not responsible for how your browser or network handles that request.",
        ] },

        { title: "No warranty", paragraphs: [
          "To the fullest extent permitted by law, the App is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including fitness for a particular purpose and uninterrupted operation.",
          "This does not exclude or limit any warranty or guarantee that consumer law in your country provides and does not allow to be excluded.",
        ] },

        { title: "Limitation of liability", paragraphs: [
          "To the fullest extent permitted by law, IntelliBucket is not liable for indirect, incidental, special, or consequential loss arising from use of, or inability to use, the App — including a session ending unexpectedly, a missed rule, or battery consumption.",
          "Where liability cannot be excluded, it is limited to the amount you actually paid for the App in the twelve months before the claim, which for a free installation is nothing and for Premium is the one-time purchase price.",
          "Nothing here limits liability for death or personal injury caused by negligence, for fraud, or for anything else that law does not permit to be limited.",
        ] },

        { title: "Ending these terms", paragraphs: [
          "You can end them at any time by uninstalling the App. Uninstalling removes local data from the device; it does not cancel a purchase, which stays with your Google Play account.",
          "IntelliBucket may end your licence if you materially breach these terms — for example by tampering with the entitlement or redistributing the App.",
        ] },

        { title: "Changes to these terms", paragraphs: [
          "These terms may be updated when the App changes or when legal requirements do. The revision date at the top of this page always reflects the current version.",
          "Continuing to use the App after an update means you accept the revised terms. If you do not, uninstall the App.",
        ] },

        { title: "Contact", paragraphs: [
          `Questions about these terms, refund requests that Google Play has passed on, and anything else about the App can be sent to ${ALWAYS_AWAKE_CONTACT}.`,
          "For how the App handles information on your device, see the Privacy Policy.",
        ] },

      ]} />;
  }

  const development = product.status === "In development";
  return <PolicyPage product={product} label="Terms & conditions" intro={development ? `${product.name} is still in development. These terms are a pre-release framework and will be updated before the product becomes available.` : `These terms govern your use of ${product.name}. By downloading or using the product, you agree to use it responsibly and in line with these terms.`} sections={[
    { title: "Using the product", paragraphs: [`IntelliBucket grants you a limited, personal, non-exclusive, non-transferable, and revocable right to use ${product.name} for its intended purpose, subject to these terms and the rules of the store where you obtained it.`] },
    { title: "Responsible use", paragraphs: ["You may not misuse the product, interfere with its operation, attempt unauthorized access, reverse engineer it where prohibited by law, or use it to violate the rights of others."] },
    { title: "Availability and changes", paragraphs: [development ? "The product is not yet generally available. Features, platforms, timing, and the product name may change during development." : "Features may be improved, changed, suspended, or discontinued. IntelliBucket aims to keep the product reliable but does not promise uninterrupted or error-free availability."] },
    { title: "Third-party services", paragraphs: ["The product may rely on operating systems, app stores, device features, or other third-party services. Their availability and rules are outside IntelliBucket’s control and may be governed by separate terms."] },
    { title: "No warranties", paragraphs: ["To the extent permitted by law, the product is provided on an “as is” and “as available” basis. Nothing in these terms limits consumer rights that cannot legally be excluded."] },
    { title: "Liability", paragraphs: ["To the extent permitted by law, IntelliBucket is not liable for indirect, incidental, special, or consequential loss resulting from use of or inability to use the product."] },
    { title: "Changes and contact", paragraphs: ["These terms may be updated as the product evolves or legal requirements change. Questions can be sent to mammadli.vugar@hotmail.com."] },
  ]} />;
}
