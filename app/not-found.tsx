import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-shell";

export default function NotFound() {
  return <main className="not-found"><SiteHeader /><section><span>404 / OUTSIDE THE BUCKET</span><h1>Nothing here.<br /><em>That is useful to know.</em></h1><Link className="button button-primary" href="/">Return home ↗</Link></section><SiteFooter /></main>;
}
