import type { Metadata } from "next";
import Link from "next/link";
import { products } from "./products";
import { SiteFooter, SiteHeader } from "./site-shell";

export const metadata: Metadata = {
  title: { absolute: "IntelliBucket — Small software, sharply made" },
  description:
    "IntelliBucket is an independent software studio building focused mobile apps and future desktop tools, including Always Awake.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IntelliBucket",
    url: "https://intellibucket.com",
    email: "mammadli.vugar@hotmail.com",
    description: "An independent software studio building focused digital tools.",
  };

  return (
    <main>
      <SiteHeader />
      <section className="home-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <span className="kicker"><i /> Independent software studio</span>
          <h1>
            Small software.
            <br />
            <em>Sharply made.</em>
          </h1>
          <p>
            Useful apps for the little moments technology should handle better.
            Mobile today. Desktop, when it earns a place.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/alwaysawake">
              Meet Always Awake <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/#products">
              View all products <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>

        <div className="signal-stage" aria-label="IntelliBucket product system illustration">
          <div className="stage-window window-one">
            <div className="window-bar"><i /><i /><i /><span>01 / LIVE</span></div>
            <div className="awake-orbit">
              <div className="awake-core"><span>AWAKE</span></div>
            </div>
            <div className="window-status"><span>DISPLAY</span><b>ON</b></div>
          </div>
          <div className="stage-window window-two">
            <div className="window-bar"><i /><i /><i /><span>BUILD LOG</span></div>
            <div className="tiny-lines"><i /><i /><i /><i /><i /></div>
            <strong>5 PRODUCTS<br />1 BUCKET</strong>
          </div>
          <div className="stage-label label-a">MOBILE / NOW</div>
          <div className="stage-label label-b">DESKTOP / NEXT</div>
        </div>

        <div className="hero-index"><span>IB—26</span><span>41°01′N / 28°58′E</span></div>
      </section>

      <section className="product-section" id="products">
        <div className="section-heading">
          <div>
            <span className="kicker dark"><i /> Products</span>
            <h2>One studio.<br />Distinct little tools.</h2>
          </div>
          <p>
            Each product gets its own space, support information, and policy pages.
            No bloated suite. No forced ecosystem.
          </p>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <Link
              className={`product-row accent-${product.accent}`}
              href={`/${product.slug}`}
              key={product.slug}
            >
              <span className="product-number">{product.index}</span>
              <span className="product-symbol" aria-hidden="true"><i /></span>
              <span className="product-name">
                <strong>{product.name}</strong>
                <small>{product.eyebrow}</small>
              </span>
              <span className="product-status"><i /> {product.status}</span>
              <span className="product-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="studio-section" id="studio">
        <div className="studio-note">
          <span className="note-label">A note from the bucket</span>
          <p>
            We believe the best utility is the one you notice once—then simply trust.
            IntelliBucket builds focused products with a clear job, a clear interface,
            and room to breathe.
          </p>
        </div>
        <div className="principle-grid">
          <article><span>01</span><h3>Purpose before features</h3><p>Every product begins with one useful outcome.</p></article>
          <article><span>02</span><h3>Quiet by default</h3><p>Less interruption. Fewer layers. Better attention.</p></article>
          <article><span>03</span><h3>Built to travel</h3><p>Mobile first, with desktop experiences on the horizon.</p></article>
        </div>
      </section>

      <section className="next-section">
        <span className="kicker"><i /> Currently shipping</span>
        <h2>Keep the screen on.<br /><em>Keep moving.</em></h2>
        <Link className="round-link" href="/alwaysawake">
          <span>Explore<br />Always Awake</span><b aria-hidden="true">↗</b>
        </Link>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </main>
  );
}
