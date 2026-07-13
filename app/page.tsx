import { LinkShortener } from "@/components/LinkShortener";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="text-sm text-faint">
        <span className="text-accent-dim">##</span> {children}
      </span>
      <div className="h-px flex-1 bg-hairline" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-6 text-sm">
        <a href="https://pcstyle.dev" className="text-foreground">
          <span className="text-faint">~/</span>
          <span className="font-semibold">pcstyle</span>
          <span className="text-faint">/s</span>
        </a>
        <nav className="flex items-center gap-6 text-muted">
          <a href="https://pcstyle.dev" className="transition-colors hover:text-foreground">home</a>
          <a href="https://github.com/pcstyle-os/short" className="transition-colors hover:text-foreground">github</a>
        </nav>
      </header>

      <section className="mx-auto max-w-2xl px-6 pb-16 pt-24">
        <p className="mb-4 text-sm text-accent"><span className="text-accent-dim">→</span> shorten</p>
        <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl">Long link in. Short link out.</h1>
        <p className="max-w-md leading-relaxed text-muted">
          turn unwieldy URLs into clean, shareable links with optional custom aliases and click tracking.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {["fast", "custom aliases", "click tracking"].map((tag) => (
            <span key={tag} className="rounded border border-accent-dim/60 px-2.5 py-0.5 text-xs text-accent">{tag}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24">
        <SectionLabel>shorten a link</SectionLabel>
        <LinkShortener />
      </section>

      <footer className="mx-auto flex max-w-2xl items-center justify-between border-t border-hairline px-6 py-10 text-xs text-faint">
        <span>© 2026 Adam Krupa</span>
        <div className="flex gap-4">
          <a href="https://pcstyle.dev" className="transition-colors hover:text-foreground">pcstyle.dev</a>
          <span>·</span>
          <a href="https://github.com/pcstyle-os/short" className="transition-colors hover:text-foreground">github</a>
        </div>
      </footer>
    </main>
  );
}
