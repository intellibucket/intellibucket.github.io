import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../products";
import { SiteFooter, SiteHeader } from "../site-shell";

type ProductPageProps = { params: Promise<{ product: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ product: slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProduct((await params).product);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/${product.slug}` },
    openGraph: { title: `${product.name} — IntelliBucket`, description: product.summary },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProduct((await params).product);
  if (!product) notFound();
  const isLive = product.status === "Available";
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, Android",
    description: product.summary,
    url: `https://intellibucket.com/${product.slug}`,
    author: { "@type": "Organization", name: "IntelliBucket" },
  };

  return (
    <main className={`product-page accent-${product.accent}`}>
      <SiteHeader />
      <section className="product-hero">
        <div className="product-hero-copy">
          <span className="kicker"><i /> {product.status}</span>
          <span className="product-overline">{product.index} / {product.eyebrow}</span>
          <h1>{product.name}</h1>
          <p className="product-tagline">{product.tagline}</p>
          <p className="product-summary">{product.summary}</p>
          {isLive ? (
            <div className="hero-actions">
              <a className="button button-primary" href="#availability">Find your store <span aria-hidden="true">↓</span></a>
              <Link className="text-link light" href={`/${product.slug}/privacy`}>Privacy at a glance <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <div className="hero-actions">
              <a className="button button-primary" href={`mailto:hello@intellibucket.com?subject=${encodeURIComponent(`${product.name} early access`)}`}>Ask about early access <span aria-hidden="true">↗</span></a>
              <Link className="text-link light" href="/#products">All products <span aria-hidden="true">←</span></Link>
            </div>
          )}
        </div>

        <div className="product-device" aria-label={`${product.name} visual preview`}>
          <div className="device-shell">
            <div className="device-top"><span>9:41</span><i /></div>
            <div className="device-content">
              <small>INTELLIBUCKET / {product.index}</small>
              {isLive ? (
                <>
                  <div className="device-orbit"><span>AWAKE</span></div>
                  <strong>Screen timeout<br />is paused</strong>
                  <div className="device-switch"><span>Stay awake</span><i /></div>
                </>
              ) : (
                <>
                  <div className="build-symbol"><i /><i /><i /></div>
                  <strong>Currently<br />taking shape</strong>
                  <div className="build-progress"><i /></div>
                </>
              )}
            </div>
          </div>
          <div className="device-coordinate">IB / PRODUCT SYSTEM / {product.index}</div>
        </div>
      </section>

      {isLive ? (
        <>
          <section className="use-cases">
            <div className="section-heading compact">
              <div><span className="kicker dark"><i /> Built for real moments</span><h2>Timeout should<br />know when to wait.</h2></div>
              <p>Always Awake is a small tool for the surprisingly common moments when your display needs to remain present.</p>
            </div>
            <div className="use-grid">
              <article><span>01</span><i className="use-glyph glyph-read" /><h3>Read & reference</h3><p>Keep notes, instructions, sheet music, or long-form text in view.</p></article>
              <article><span>02</span><i className="use-glyph glyph-move" /><h3>Cook & move</h3><p>Follow a recipe or workout without reaching back for the screen.</p></article>
              <article><span>03</span><i className="use-glyph glyph-show" /><h3>Demo & display</h3><p>Let a screen stay useful during presentations, counters, and demos.</p></article>
            </div>
          </section>

          <section className="availability" id="availability">
            <div><span className="kicker"><i /> Available on mobile</span><h2>One small switch.<br /><em>A lot less tapping.</em></h2></div>
            <div className="store-stack">
              <a href="https://apps.apple.com/us/search?term=Always%20Awake" target="_blank" rel="noreferrer"><span><small>Search on the</small>App Store</span><b>↗</b></a>
              <a href="https://play.google.com/store/search?q=Always%20Awake&c=apps" target="_blank" rel="noreferrer"><span><small>Search on</small>Google Play</span><b>↗</b></a>
              <p>Direct store links can be connected as soon as they are provided.</p>
            </div>
          </section>
        </>
      ) : (
        <section className="development-note">
          <span className="kicker dark"><i /> Work in progress</span>
          <h2>The useful version<br />comes before the loud one.</h2>
          <p>We are defining the product carefully before saying too much. This page will grow with real details, release information, privacy documentation, and download links as {product.name} gets closer to launch.</p>
          <div className="dev-meta"><span>STATUS / ACTIVE DEVELOPMENT</span><span>PLATFORMS / TO BE ANNOUNCED</span><span>UPDATES / ON THIS PAGE</span></div>
        </section>
      )}

      <section className="policy-strip">
        <p>Clear products deserve clear policies.</p>
        <div><Link href={`/${product.slug}/privacy`}>Privacy policy <span>↗</span></Link><Link href={`/${product.slug}/terms`}>Terms & conditions <span>↗</span></Link></div>
      </section>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
    </main>
  );
}
