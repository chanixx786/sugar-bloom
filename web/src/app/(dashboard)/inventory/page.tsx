"use client";

import React, { useMemo, useState } from "react";
import { Boxes } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { INITIAL_INVENTORY, InventoryItem } from "./mock-data";
import { getInventoryColumns } from "./columns";
import { InventoryStats } from "./inventory-stats";
import { InventoryFilters } from "./inventory-filters";
import { PageHeader } from "@/components/ui/page-header";
import InventoryModal from "./modal";
import { toast } from "sonner";
// Page

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

  // Stats
  const stats = useMemo(
    () => ({
      total: inventory.length,
      inStock: inventory.filter((i) => i.status === "In stock").length,
      lowStock: inventory.filter((i) => i.status === "Low stock").length,
      outOfStock: inventory.filter((i) => i.status === "Out of stock").length
    }),
    [inventory]
  );

  // Filtered data
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    return inventory.filter((item) => {
      const matchesSearch =
        !q || item.item.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [inventory, search, statusFilter, categoryFilter]);

  // Handlers
  const handleEdit = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: InventoryItem) => {
    if (confirm(`Delete "${item.item}" from inventory?`)) {
      setInventory((prev) => prev.filter((i) => i.id !== item.id));
      toast.success(`"${item.item}" removed from inventory.`);
    }
  };

  const handleSave = (savedItem: InventoryItem) => {
    setInventory((prev) => {
      const exists = prev.some((i) => i.id === savedItem.id);
      if (exists) {
        return prev.map((i) => (i.id === savedItem.id ? savedItem : i));
      }
      return [savedItem, ...prev];
    });
    setIsModalOpen(false);
    toast.success(
      savedItem.id && inventory.some((i) => i.id === savedItem.id)
        ? `"${savedItem.item}" updated successfully.`
        : `"${savedItem.item}" added to inventory.`
    );
  };
  const columns = getInventoryColumns(handleEdit, handleDelete);

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in duration-300">
      {/* Page Header */}
      <PageHeader
        title="Inventory Management"
        description="Track raw materials, ingredients, and packaging stock levels."
        icon={Boxes}
        buttonLabel="Add Inventory"
        onButtonClick={() => {
          setCurrentItem(null);
          setIsModalOpen(true);
        }}
      />

      {/* Stats Cards */}
      <InventoryStats
        total={stats.total}
        inStock={stats.inStock}
        lowStock={stats.lowStock}
        outOfStock={stats.outOfStock}
      />

      {/* Data Table */}
      <Card>
        <CardContent className="flex flex-col gap-8">
          {/* Search & Filters */}
          <InventoryFilters
            searchQuery={search}
            setSearchQuery={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <DataTable
            columns={columns}
            data={filteredData}
            pageSize={8}
            emptyMessage="No inventory items found."
          />
        </CardContent>
      </Card>

      {/* Inventory Modal */}
      <InventoryModal
        item={currentItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
