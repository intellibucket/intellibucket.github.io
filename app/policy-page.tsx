import Link from "next/link";
import type { Product } from "./products";
import { SiteFooter, SiteHeader } from "./site-shell";

type PolicySection = { title: string; paragraphs: string[] };

export function PolicyPage({ product, label, intro, sections, updated = "20 August 2026" }: { product: Product; label: string; intro: string; sections: PolicySection[]; updated?: string }) {
  return (
    <main className="legal-page">
      <SiteHeader />
      <section className="legal-hero">
        <div><span className="kicker"><i /> {product.name}</span><h1>{label}</h1></div>
        <div className="legal-intro"><p>{intro}</p><span>Last updated / {updated}</span></div>
      </section>
      <section className="legal-body">
        <aside>
          <Link href={`/${product.slug}`}>← Back to {product.name}</Link>
          <span>Product / {product.index}</span>
          <span>Status / {product.status}</span>
        </aside>
        <div className="legal-copy">
          {sections.map((section, index) => (
            <article key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="legal-contact"><span>Still have a question?</span><a href="mailto:mammadli.vugar@hotmail.com">mammadli.vugar@hotmail.com ↗</a></section>
      <SiteFooter />
    </main>
  );
}
