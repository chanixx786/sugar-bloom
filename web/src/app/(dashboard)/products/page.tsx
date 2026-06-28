"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import { Product, INITIAL_PRODUCTS } from "./mock-data";
import { ProductStats } from "./ProductStats";
import { ProductFilters } from "./ProductFilters";
import { ProductCard } from "./ProductCard";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  // Page states
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Reset to first page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter]);

  // Calculations for stats dashboard cards
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.prod_status === "Available").length;
    const totalStock = products.reduce((sum, p) => sum + p.prod_stock, 0);
    const lowStock = products.filter(
      (p) => p.prod_status === "Available" && p.prod_stock <= 5
    ).length;

    return { total, active, totalStock, lowStock };
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.prodlist.prodlist_name.toLowerCase().includes(q) ||
          p.prodlist.cat.cat_name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.prodlist.cat.cat_name === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter((p) => p.prod_status === statusFilter);
    }

    return result;
  }, [products, searchQuery, categoryFilter, statusFilter]);

  // Paginated Output
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in duration-300">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200/50">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[oklch(0.3828_0.106_350.28)] flex items-center gap-2">
            Products Directory
            <Sparkles className="size-5 text-[#d44876] animate-pulse" />
          </h1>
          <p className="text-sm text-[oklch(0.55_0.08_350)]">
            Manage your delicious product catalog, pricing structures, inventory levels, and active
            promotions.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-[#d44876] to-[#f6bc9c] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
          <Plus className="size-4" /> Add Product
        </Button>
      </div>

      {/* ── Summary Stats Cards ── */}
      <ProductStats
        total={stats.total}
        active={stats.active}
        totalStock={stats.totalStock}
        lowStock={stats.lowStock}
      />

      <Card>
        <CardContent className=" flex flex-col gap-4">
          {/* ── Search & Filtering Interface ── */}
          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

        <Separator className="mb-8"/>
         
          {/* ── Products Grid ── */}
          {paginatedProducts.length === 0 ? (
            <Card className="border border-dashed border-pink-200 py-16 text-center bg-white/40 ">
              <CardContent className="flex flex-col items-center gap-3">
                <div className="p-4 bg-pink-50 rounded-full text-[#d44876]">
                  <Search className="size-8" />
                </div>
                <h3 className="text-lg font-bold text-[oklch(0.3828_0.106_350.28)]">
                  No matching products
                </h3>
                <p className="text-sm text-[oklch(0.55_0.08_350)] max-w-sm">
                  We couldn&apos;t find any products matching your search or filters. Try adjusting
                  your query or resetting filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("All");
                    setStatusFilter("All");
                  }}
                  className="mt-2"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.prod_id}
                  product={product}
                  onEdit={(prod) => {
                    setCurrentProduct(prod);
                  }}
                  onDelete={(prod) => {
                    setCurrentProduct(prod);
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Pagination Controls ── */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center w-full">
              <Pagination>
                <PaginationContent>
                  {/* Previous Page Link */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={cn(
                        "cursor-pointer",
                        currentPage === 1 &&
                          "pointer-events-none opacity-50 bg-transparent text-gray-400"
                      )}
                    />
                  </PaginationItem>

                  {/* Numbered Page Links */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          isActive={pageNum === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNum);
                          }}
                          className="cursor-pointer font-semibold rounded-xl"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Next Page Link */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={cn(
                        "cursor-pointer",
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50 bg-transparent text-gray-400"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
