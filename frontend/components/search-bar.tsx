"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchProduct } from "@/api/products";
import { Product } from "@/types/product";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (search.trim().length > 0) {
      setResults([]);
      router.push(`/products?q=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    if (search.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const { products } = await searchProduct(search);
        setResults(products);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-2xl" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit} action="">
        <div className="hidden md:flex items-center bg-muted rounded-md border focus-within:ring-2 focus-within:ring-primary/20">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
          />
          <div className="px-3">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : (
              <Search className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </form>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-xl overflow-hidden z-50">
          <div className="max-h-[400px] overflow-y-auto">
            {results.map((product) => (
              <a
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b last:border-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ${product.price}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="bg-muted/50 px-4 py-2 text-xs text-center text-muted-foreground">
            Press Enter for all results
          </div>
        </div>
      )}

      <button onClick={() => setOpen(true)} className="md:hidden p-2">
        <Search className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-background z-[100] p-4 flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-muted px-4 py-2 rounded-md outline-none"
            />
            <button
              onClick={() => {
                setOpen(false);
                setSearch("");
                setResults([]);
              }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto">
            {results.map((product) => (
              <div key={product.id} className="py-3 border-b text-sm">
                {product.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
