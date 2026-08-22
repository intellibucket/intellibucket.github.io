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

const ALWAYS_AWAKE_CONTACT = "mammadli.vugar@hotmail.com";

export default async function Privacy({ params }: Props) {
  const product = getProduct((await params).product);
  if (!product) notFound();

  if (product.slug === "alwaysawake") {
    return <PolicyPage
      product={product}
      label="Privacy policy"
      updated="22 August 2026"
      intro={`Always Awake ("the App") is developed by IntelliBucket. The App has no accounts, no analytics, no advertising, and no server of its own. This policy explains exactly what it reads on your device, why, where it is kept, and the two narrow cases in which information leaves your phone.`}
      sections={[

        { title: "At a glance", paragraphs: [
          "The App does not collect personal data. There is no sign-up, no profile, and no IntelliBucket server that the App talks to.",
          "Everything the App reads — the apps you pick for rules, the Wi-Fi network name, paired Bluetooth devices, battery level — is read on your device, used immediately to decide whether to keep your screen on, and then discarded or stored locally.",
          "Two things do leave your phone, and both are Google services acting on your behalf rather than ours: a purchase you make goes through Google Play Billing, and your settings and rules may be copied to your own Google Drive by Android's built-in backup. Both are described in detail below.",
        ] },

        { title: "Who is responsible", paragraphs: [
          "The App is developed and published by IntelliBucket. On Google Play the developer name shown is IntelliBucket.",
          `For any question about this policy or about your data, write to ${ALWAYS_AWAKE_CONTACT}.`,
        ] },

        { title: "What the App does not do", paragraphs: [
          "It does not ask you to create an account or sign in.",
          "It does not contain any analytics, telemetry, crash-reporting, attribution, or advertising SDK.",
          "It does not build a profile of you, and it does not sell or share information with third parties for advertising or any other purpose.",
          "It does not read the contents of other apps. The overlay it draws is a single transparent pixel used only to keep the display awake; it cannot see or capture what is on your screen.",
          "It does not track your location. On Android 12 and older a location permission is required by the operating system to read a Wi-Fi network name — see the permissions section — but no coordinates are ever requested, stored, or transmitted.",
        ] },

        { title: "Information the App reads on your device", paragraphs: [
          "Installed app list — Read to populate the app picker when you create a per-app rule, and to detect when one of your chosen apps comes to the foreground. The App queries only apps that have a launcher icon; it does not enumerate every package on the device.",
          "Foreground app — Which app is currently in front, so a per-app rule can start or stop a session. Read only while at least one per-app rule exists.",
          "Wi-Fi network name (SSID) — Compared against the network you named in a Wi-Fi rule. Read only when such a rule exists.",
          "Paired Bluetooth devices — Device names and addresses, listed so you can choose one when creating a Bluetooth rule, and matched when a device connects or disconnects.",
          "Headphone connection state — Whether wired or Bluetooth audio output is connected, for headphone rules.",
          "Battery level and charging state — To stop a session when the battery gets low, to run charge-based rules, and to end sessions when you unplug.",
          "System screen-timeout value — Read and temporarily changed only when the fallback wake engine is in use, and restored to its original value when the session ends.",
          "None of the above is sent anywhere. It is evaluated on the device and either kept in your local settings or dropped immediately.",
        ] },

        { title: "Permissions the App requests and why", paragraphs: [
          "Display over other apps (SYSTEM_ALERT_WINDOW) — Draws the invisible overlay that keeps the screen awake in every app, not just this one. Nothing is drawn on top of your content and nothing is read from it.",
          "Modify system settings (WRITE_SETTINGS) — Offered as a lighter alternative if you decline the overlay. Used only to extend the screen-timeout value while a session runs, and it is put back afterwards.",
          "Foreground service, special use (FOREGROUND_SERVICE, FOREGROUND_SERVICE_SPECIAL_USE) — Keeps the session alive while you are in other apps, with an ongoing notification you can stop it from.",
          "Notifications (POST_NOTIFICATIONS) — Shows that ongoing notification. It is the only way to stop a session without opening the App. Requested on Android 13 and newer.",
          "Usage access (PACKAGE_USAGE_STATS) — Granted by you in system settings, and only needed for per-app rules. It tells the App which app is in the foreground; it is never used to build a usage history.",
          "Nearby devices (NEARBY_WIFI_DEVICES) — On Android 13 and newer, the permission that lets the App read the connected Wi-Fi network's name. It is declared with the neverForLocation flag, so the system prevents it from being used to derive your location.",
          "Location (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION) — Requested only on Android 12 and older, and only when you create a Wi-Fi rule. On those versions Android will not reveal the Wi-Fi network name to any app without it. The App reads the network name and nothing else; your location is never stored, logged, or transmitted. These permissions are capped at Android 12 in the App's manifest, so a device running Android 13 or newer is never asked for them.",
          "Bluetooth (BLUETOOTH_CONNECT, and BLUETOOTH on Android 11 and older) — Lists your paired devices so you can pick one for a Bluetooth rule.",
          "Run at startup (RECEIVE_BOOT_COMPLETED) — Used only if you turn on \"resume after restart\", so a session can come back after a reboot.",
          "Internet — Present because Google Play Billing requires it to process a purchase. The App makes no network requests of its own; there is no server for it to contact.",
          "Every permission above is requested at the moment the matching feature is first used, after a screen explaining why. Declining one disables only that feature; the rest of the App keeps working.",
        ] },

        { title: "Where information is stored", paragraphs: [
          "Your settings, automation rules, and the record of a running session are stored locally on your device using Android's standard preference storage. They are readable only by the App, inside the sandbox Android gives every application.",
          "Your Premium purchase status is stored locally as well, in a separate preferences file of its own.",
          "There is no IntelliBucket account, database, or server. Nothing above is uploaded to us.",
        ] },

        { title: "Android backup — the one case where settings leave your phone", paragraphs: [
          "Android includes a system feature called Auto Backup. If it is enabled on your device, Android periodically copies parts of an app's local data to your personal Google Drive so it can be restored when you set up a new phone. This happens between you and Google; IntelliBucket has no access to it and cannot read it.",
          "For this App, Auto Backup covers your settings and your automation rules, so that changing phones does not mean rebuilding them by hand.",
          "Your Premium purchase status is deliberately excluded from that backup. It is kept in its own file that the App tells Android never to back up, so an entitlement cannot be copied to a device that did not pay for it. On a new phone, Premium is restored from Google Play instead, using the Restore purchase button.",
          "You can turn Auto Backup off entirely in your device's system settings, and you can delete an existing backup from your Google account's backup settings.",
        ] },

        { title: "In-app purchases", paragraphs: [
          "The App offers a single one-time purchase that unlocks Premium features. There is no subscription and no recurring charge.",
          "The purchase is handled entirely by Google Play Billing. IntelliBucket never sees your card number, billing address, or Google account details — only whether Google Play reports the product as owned.",
          "That answer is stored on your device as a single flag so Premium keeps working offline. If you reinstall the App or move to a new phone, Restore purchase asks Google Play again and unlocks Premium without charging you a second time.",
          "If a purchase is refunded or revoked, Google Play stops reporting it as owned and the App returns to the free tier the next time it checks. Your rules and settings are kept; only the Premium features are locked again.",
          "Google's handling of the payment is covered by Google's own privacy policy, not this one.",
        ] },

        { title: "Third-party components", paragraphs: [
          "The App is built with Flutter (Google) and uses Google Play Billing for purchases. Neither collects personal data for IntelliBucket.",
          "The remaining components it bundles are open-source libraries that read and write local settings, keep the screen awake, and open a web link when you tap Privacy Policy. None of them contact a server.",
          "There is no advertising network, no analytics provider, and no attribution or crash-reporting service in the App.",
        ] },

        { title: "How long information is kept, and how to delete it", paragraphs: [
          "Local data stays on your device until you remove it. There is no retention period on our side because there is no copy on our side.",
          "Uninstalling the App, or clearing its data from Android Settings, deletes every setting, rule, session record, and the local Premium flag from the device immediately.",
          "If Auto Backup has stored a copy in your Google Drive, delete it from your Google account's backup settings; that copy is under your control, not ours.",
          "Deleting local data does not cancel a purchase. A purchase lives with your Google Play account and can be restored at any time.",
        ] },

        { title: "Security", paragraphs: [
          "All App data is held in Android's per-app sandbox, which prevents other apps from reading it.",
          "The App stores no passwords, tokens, or payment details, because it never receives any.",
          "Because nothing is transmitted to us, there is no server-side store of your information that could be exposed.",
        ] },

        { title: "Children and age rating", paragraphs: [
          "The App is a utility for controlling screen timeout. It is not directed at children under 13, and it is listed on Google Play for an audience of 13 and over.",
          "It contains no user-generated content, no social or messaging features, no advertising, and no external links other than this policy.",
          "IntelliBucket does not knowingly collect personal information from anyone, including children. Since the App collects nothing and requires no account, there is no children's data for us to hold.",
        ] },

        { title: "Your rights", paragraphs: [
          "Rights such as access, correction, portability, and erasure apply to personal data a company holds about you. IntelliBucket holds none: there is no account, no identifier, and no copy of your data outside your own device and your own Google account.",
          "In practice this means you can exercise full control yourself — inspect what the App has granted under Settings, revoke any permission in system settings, and delete everything by clearing app data or uninstalling.",
          `If you believe something in this policy does not match how the App behaves, write to ${ALWAYS_AWAKE_CONTACT} and it will be corrected.`,
        ] },

        { title: "Changes to this policy", paragraphs: [
          "This policy may be updated when the App gains features that touch data differently, or when platform or legal requirements change.",
          "The revision date at the top of this page always reflects the current version. Material changes will also be noted in the App's release notes on Google Play.",
        ] },

        { title: "Contact", paragraphs: [
          `Questions about this policy, or about anything the App does with information on your device, can be sent to ${ALWAYS_AWAKE_CONTACT}.`,
        ] },

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
    { title: "Contact", paragraphs: ["Privacy questions can be sent to mammadli.vugar@hotmail.com."] },
  ]} />;
}
