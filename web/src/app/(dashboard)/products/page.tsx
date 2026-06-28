"use client";

import React, { useState, useMemo } from "react";
import { Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Product, INITIAL_PRODUCTS } from "./mock-data";
import { ProductStats } from "./product-stats";
import { ProductFilters } from "./product-filters";
import { ProductCard } from "./product-card";
import { Separator } from "@/components/ui/separator";
import ProductModal from "./modal";
import { SmartPagination } from "@/components/ui/pagination/smart-pagination";
import { PageHeader } from "@/components/ui/page-header";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveProduct = (updatedProduct: Product) => {
    if (currentProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.prod_id === updatedProduct.prod_id ? updatedProduct : p))
      );
    } else {
      setProducts((prev) => [updatedProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

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

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.prodlist.prodlist_name.toLowerCase().includes(q) ||
          p.prodlist.cat.cat_name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.prodlist.cat.cat_name === categoryFilter);
    }

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
      {/*  Page Header  */}
      <PageHeader
        title="Products Directory"
        description="Manage your delicious product catalog, pricing structures, inventory levels, and active promotions."
        icon={Sparkles}
        buttonLabel="Add Product"
        onButtonClick={() => {
          setCurrentProduct(null);
          setIsModalOpen(true);
        }}
      />

      {/*  Summary Stats Cards  */}
      <ProductStats
        total={stats.total}
        active={stats.active}
        totalStock={stats.totalStock}
        lowStock={stats.lowStock}
      />

      <Card>
        <CardContent className="flex flex-col gap-8">
          {/*  Search & Filtering Interface  */}
          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={handleSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={handleCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={handleStatusFilter}
          />


          {/*  Products Grid  */}
          {paginatedProducts.length === 0 ? (
            <Card className="border border-dashed border-pink-200 py-16 text-center bg-white/40">
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
                    handleSearchQuery("");
                    handleCategoryFilter("All");
                    handleStatusFilter("All");
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
                    setIsModalOpen(true);
                  }}
                  onDelete={(prod) => {
                    if (confirm(`Are you sure you want to delete ${prod.prodlist.prodlist_name}?`)) {
                      setProducts((prev) => prev.filter((p) => p.prod_id !== prod.prod_id));
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/*  Pagination Controls  */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-1">
            <p className="text-xs text-muted-foreground shrink-0">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
              </span>
              {" – "}
              <span className="font-medium text-foreground">
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
              </span>
              {" of "}
              <span className="font-medium text-foreground">{filteredProducts.length}</span>
              {" items"}
            </p>

            <SmartPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      <ProductModal
        product={currentProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}