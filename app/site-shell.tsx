import Link from "next/link";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Intellibucket home">
        <BrandMark />
        <span>Intellibucket</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/#products">Products</Link>
        <Link href="/#studio">Studio</Link>
        <a href="mailto:hello@intellibucket.com">Contact</a>
      </nav>
      <Link className="header-cta" href="/alwaysawake">
        Always Awake <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <BrandMark />
          <span>Intellibucket</span>
        </Link>
        <p>Small software. Sharply made.</p>
      </div>
      <div className="footer-links">
        <div>
          <span>Explore</span>
          <Link href="/#products">Products</Link>
          <Link href="/alwaysawake">Always Awake</Link>
        </div>
        <div>
          <span>Legal</span>
          <Link href="/alwaysawake/privacy">Privacy</Link>
          <Link href="/alwaysawake/terms">Terms</Link>
        </div>
        <div>
          <span>Say hello</span>
          <a href="mailto:hello@intellibucket.com">hello@intellibucket.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Intellibucket</span>
        <span>Independent software studio</span>
      </div>
    </footer>
  );
}
