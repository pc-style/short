import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center p-6 text-foreground">
            <div className="max-w-md text-center space-y-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg border border-hairline">
                    <AlertCircle className="h-7 w-7 text-accent" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold tracking-tight">
                        <span className="text-accent">404</span>
                        <br />
                        <span className="text-2xl text-foreground">link not found</span>
                    </h1>

                    <p className="text-sm leading-relaxed text-muted">
                        the requested short link does not exist or has been removed from the
                        system.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-accent-dim to-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                        <Home className="w-4 h-4" />
                        create a new link
                    </Link>
                </div>

            </div>
        </main>
    );
}
