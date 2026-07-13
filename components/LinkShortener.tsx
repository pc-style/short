"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, Loader2, AlertCircle, BarChart3 } from "lucide-react";

export const LinkShortener = () => {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [createdLink, setCreatedLink] = useState<{ shortCode: string; shortUrl: string } | null>(null);
  const createLink = useMutation(api.links.createLink);
  const recentLinks = useQuery(api.links.getRecentLinks);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreatedLink(null);
    if (!url.trim()) { setError("Please enter a URL"); return; }
    let processedUrl = url.trim();
    if (!/^https?:\/\//i.test(processedUrl)) processedUrl = "https://" + processedUrl;
    setIsCreating(true);
    try {
      const result = await createLink({ url: processedUrl, customAlias: showCustom && customAlias.trim() ? customAlias.trim() : undefined });
      setCreatedLink(result);
      setUrl("");
      setCustomAlias("");
      setShowCustom(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create short link");
    } finally { setIsCreating(false); }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="w-full space-y-10">
      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="long-url" className="block text-xs text-muted">long URL</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="long-url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/long-link" className="min-w-0 flex-1 rounded-md border border-hairline bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-faint focus:border-accent-dim" />
          <button type="submit" disabled={isCreating} className="inline-flex min-h-11 items-center justify-center rounded-md bg-gradient-to-r from-accent-dim to-accent px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]">
            {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "shorten"}
          </button>
        </div>
        <button type="button" onClick={() => setShowCustom(!showCustom)} className={`text-xs transition-colors ${showCustom ? "text-accent" : "text-faint hover:text-muted"}`}>
          {showCustom ? "− hide custom alias" : "+ custom alias"}
        </button>
        <AnimatePresence>
          {showCustom && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <label htmlFor="custom-alias" className="mb-2 block text-xs text-muted">custom alias</label>
              <div className="flex items-center rounded-md border border-hairline px-4 focus-within:border-accent-dim">
                <span className="text-sm text-faint">s.pcstyle.dev/</span>
                <input id="custom-alias" type="text" value={customAlias} onChange={(e) => setCustomAlias(e.target.value)} placeholder="your-alias" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-faint" pattern="^[a-zA-Z0-9_-]{3,20}$" />
              </div>
              <p className="mt-2 text-xs text-faint">3-20 characters: letters, numbers, dashes, and underscores</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      <AnimatePresence>
        {error && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-3 rounded-lg border border-red-900/70 p-4 text-sm text-red-400"><AlertCircle className="h-4 w-4 shrink-0" /><p>{error}</p></motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {createdLink && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-4 rounded-lg border border-hairline p-5">
            <div className="flex items-center gap-2 text-xs text-accent"><Check className="h-4 w-4" /> link created</div>
            <div className="flex items-center gap-3">
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{createdLink.shortUrl}</p>
              <button onClick={() => copyToClipboard(createdLink.shortUrl)} aria-label="copy short link" className="rounded-md border border-hairline p-2.5 text-muted transition-colors hover:border-accent-dim hover:text-foreground">
                {copiedUrl === createdLink.shortUrl ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {recentLinks && recentLinks.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center gap-4"><h3 className="text-sm text-faint"><span className="text-accent-dim">##</span> recent links</h3><div className="h-px flex-1 bg-hairline" /></div>
          <div className="divide-y divide-hairline rounded-lg border border-hairline">
            {recentLinks.map((link, index) => {
              const shortUrl = `https://s.pcstyle.dev/${link.shortCode}`;
              return (
                <motion.div key={link._id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-accent">s.pcstyle.dev/{link.shortCode}</p><p className="truncate text-xs text-faint">{link.url}</p></div>
                  <div className="hidden items-center gap-1 text-xs text-faint sm:flex"><BarChart3 className="h-3 w-3" />{link.clicks}</div>
                  <span className="hidden text-xs text-faint md:block">{formatDate(link.createdAt)}</span>
                  <button onClick={() => copyToClipboard(shortUrl)} aria-label="copy short link" className="rounded-md p-2 text-faint transition-colors hover:bg-hairline hover:text-foreground">{copiedUrl === shortUrl ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}</button>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label="open original link" className="rounded-md p-2 text-faint transition-colors hover:bg-hairline hover:text-foreground"><ExternalLink className="h-4 w-4" /></a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
