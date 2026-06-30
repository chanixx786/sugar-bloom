"use client";

import React, { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";

import { INITIAL_ORDERS, ExtendedOrder } from "./mock-data";
import { getOrderColumns } from "./columns";
import { OrdersStats } from "./orders-stats";
import { OrdersFilters } from "./orders-filters";
import { PageHeader } from "@/components/ui/page-header";
import { OrderModal } from "./modal";
import { OrderStatus } from "../pos/mock-data";

export default function OrdersPage() {
  const [orders, setOrders] = useState<ExtendedOrder[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: orders.length,
      completed: orders.filter((o) => o.order_status === "Completed").length,
      pending: orders.filter((o) => o.order_status === "Pending" || o.order_status === "Out on Delivery").length,
      cancelled: orders.filter((o) => o.order_status === "Cancelled").length,
    };
  }, [orders]);

  // Filters calculation
  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();
    return orders.filter((order) => {
      // Search matches ID or Customer Name
      const matchesSearch =
        !q ||
        order.order_id.toString().includes(q) ||
        (order.customer_name && order.customer_name.toLowerCase().includes(q));

      const matchesType = typeFilter === "All" || order.order_type === typeFilter;
      const matchesStatus = statusFilter === "all" || order.order_status === statusFilter;
      const matchesPayment = paymentStatusFilter === "all" || order.order_payment_status === paymentStatusFilter;

      return matchesSearch && matchesType && matchesStatus && matchesPayment;
    });
  }, [orders, search, typeFilter, statusFilter, paymentStatusFilter]);

  // Handlers
  const handleViewDetails = (order: ExtendedOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (
    orderId: number,
    newStatus: OrderStatus,
    newPaymentStatus: "Paid" | "Unpaid"
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === orderId
          ? { ...order, order_status: newStatus, order_payment_status: newPaymentStatus }
          : order
      )
    );
    toast.success(`Order #${orderId} status successfully updated to ${newStatus}.`);
  };

  // Get columns
  const columns = useMemo(() => getOrderColumns(handleViewDetails), []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Orders"
        description="Manage, filter and track client transactions"
        icon={ClipboardList}
      />

      {/* Orders Statistics Cards */}
      <OrdersStats
        total={stats.total}
        completed={stats.completed}
        pending={stats.pending}
        cancelled={stats.cancelled}
      />

      {/* Orders Filters & Actions */}
      <Card className="rounded-[2rem] border-none shadow-md overflow-hidden bg-white py-0 gap-0 p-0">
        <CardContent className="p-6 space-y-6">
          <OrdersFilters
            searchQuery={search}
            setSearchQuery={setSearch}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            paymentStatusFilter={paymentStatusFilter}
            setPaymentStatusFilter={setPaymentStatusFilter}
          />

          {/* Orders Data Table */}
          <DataTable
            columns={columns}
            data={filteredOrders}
            pageSize={8}
            emptyMessage="No orders match the selected filters."
          />
        </CardContent>
      </Card>

      {/* Order Details & Management Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}