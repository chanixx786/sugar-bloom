"use client";

import { useState } from "react";
import { INITIAL_PRODUCTS } from "./mock-data";
import { usePosCart } from "./use-pos-cart";
import { ReceiptModal } from "./receipt-modal";
import { CustomerModal } from "./customer-modal";
import { ProductCatalog } from "./product-catalog";
import { OrderPanel } from "./order-panel";

export default function POSPage() {
  const [products] = useState(INITIAL_PRODUCTS);
  const pos = usePosCart(products);

  return (
    <>
      <CustomerModal
        open={pos.customerModalOpen}
        orderType={pos.orderType}
        onClose={() => pos.setCustomerModalOpen(false)}
        onConfirm={pos.handleConfirmCustomer}
      />

      <ReceiptModal
        order={pos.lastOrder}
        change={pos.lastChange}
        onClose={pos.clearReceipt}
      />

      <div
        className="flex flex-col gap-4 w-full animate-fade-in duration-300"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <div className="flex gap-4 flex-1 min-h-0">
          <ProductCatalog
            search={pos.search}
            onSearchChange={pos.setSearch}
            categoryFilter={pos.categoryFilter}
            onCategoryChange={pos.setCategoryFilter}
            products={pos.filteredProducts}
            onAddToCart={pos.handleAddToCart}
          />

          <OrderPanel
            cart={pos.cart}
            itemCount={pos.itemCount}
            orderType={pos.orderType}
            onOrderTypeChange={pos.handleOrderTypeChange}
            customerName={pos.customer?.customer_name}
            onChangeCustomer={() => pos.setCustomerModalOpen(true)}
            paymentMode={pos.paymentMode}
            onPaymentModeChange={pos.setPaymentMode}
            amountTendered={pos.amountTendered}
            onAmountTenderedChange={pos.setAmountTendered}
            orderTotal={pos.orderTotal}
            discountTotal={pos.discountTotal}
            change={pos.change}
            isProcessing={pos.isProcessing}
            onIncrease={pos.handleIncrease}
            onDecrease={pos.handleDecrease}
            onRemove={pos.handleRemove}
            onClearCart={pos.handleClearCart}
            onPlaceOrder={pos.handlePlaceOrder}
          />
        </div>
      </div>
    </>
  );
}
