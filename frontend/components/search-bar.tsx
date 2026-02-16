"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-1 max-w-2xl items-center bg-muted rounded-md border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
        />
        <button
          type="button"
          className="px-5 py-2 bg-primary text-primary-foreground"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2"
        aria-label="Open search"
      >
        <Search className="w-6 h-6" />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 bg-background border-t px-4 py-3 flex gap-2 md:hidden">
          <input
            autoFocus
            type="text"
            className="flex-1 bg-muted px-4 py-2 rounded-md text-sm outline-none"
          />
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
