-- CreateEnum
CREATE TYPE "AccType" AS ENUM ('staff', 'customer', 'admin');

-- CreateEnum
CREATE TYPE "ProdListStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "PromoType" AS ENUM ('percent', 'fixed', 'bundle');

-- CreateEnum
CREATE TYPE "PromoStatus" AS ENUM ('active', 'schedule', 'expired');

-- CreateEnum
CREATE TYPE "ProdStatus" AS ENUM ('Available', 'Sold', 'Discarded', 'Reserved');

-- CreateEnum
CREATE TYPE "InvStatus" AS ENUM ('low stock', 'out of stock', 'in stock');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('Walkin', 'Online');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('E-wallet', 'Cash');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Completed', 'Pending', 'Out on Delivery', 'Cancelled');

-- CreateTable
CREATE TABLE "Account" (
    "acc_id" SERIAL NOT NULL,
    "acc_email" TEXT NOT NULL,
    "acc_phone" TEXT NOT NULL,
    "acc_fname" TEXT NOT NULL,
    "acc_lname" TEXT NOT NULL,
    "acc_type" "AccType" NOT NULL DEFAULT 'customer',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("acc_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "addr_id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "landmarks" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addr_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "cus_id" SERIAL NOT NULL,
    "cus_name" TEXT NOT NULL,
    "cus_phone" TEXT NOT NULL,
    "acc_id" INTEGER NOT NULL,
    "addr_id" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("cus_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "cat_id" SERIAL NOT NULL,
    "cat_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "acc_id" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("cat_id")
);

-- CreateTable
CREATE TABLE "ProductList" (
    "prodlist_id" SERIAL NOT NULL,
    "prodlist_name" TEXT NOT NULL,
    "prodlist_status" "ProdListStatus" NOT NULL DEFAULT 'Active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cat_id" INTEGER NOT NULL,
    "acc_id" INTEGER NOT NULL,

    CONSTRAINT "ProductList_pkey" PRIMARY KEY ("prodlist_id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "promo_id" SERIAL NOT NULL,
    "promo_code" TEXT NOT NULL,
    "promo_type" "PromoType" NOT NULL,
    "promo_value" DECIMAL(10,2) NOT NULL,
    "promo_start_date" DATE NOT NULL,
    "promo_end_date" DATE NOT NULL,
    "promo_status" "PromoStatus" NOT NULL DEFAULT 'schedule',

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("promo_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "prod_id" SERIAL NOT NULL,
    "prod_price" DECIMAL(10,2) NOT NULL,
    "prod_stock" INTEGER NOT NULL,
    "prod_status" "ProdStatus" NOT NULL DEFAULT 'Available',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "prodlist_id" INTEGER NOT NULL,
    "acc_id" INTEGER NOT NULL,
    "promo_id" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("prod_id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "inv_id" SERIAL NOT NULL,
    "inv_name" TEXT NOT NULL,
    "inv_threshold" INTEGER NOT NULL,
    "inv_qty" INTEGER NOT NULL,
    "inv_status" "InvStatus" NOT NULL DEFAULT 'in stock',
    "expiry_date" DATE,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cat_id" INTEGER NOT NULL,
    "acc_id" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inv_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "order_type" "OrderType" NOT NULL,
    "order_payment_status" TEXT NOT NULL,
    "order_payment_mode" "PaymentMode" NOT NULL,
    "order_total" DECIMAL(10,2) NOT NULL,
    "order_amount" DECIMAL(10,2) NOT NULL,
    "order_status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cus_id" INTEGER NOT NULL,
    "acc_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orditem_id" SERIAL NOT NULL,
    "orditem_qty" INTEGER NOT NULL,
    "orditem_total" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prod_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orditem_id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "exp_id" SERIAL NOT NULL,
    "exp_amount" DECIMAL(10,2) NOT NULL,
    "exp_date_purchased" DATE NOT NULL,
    "exp_vendor" TEXT NOT NULL,
    "inv_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("exp_id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "deliv_id" SERIAL NOT NULL,
    "deliv_cost" DECIMAL(10,2) NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("deliv_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_acc_email_key" ON "Account"("acc_email");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_promo_code_key" ON "Promotion"("promo_code");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_acc_id_fkey" FOREIGN KEY ("acc_id") REFERENCES "Account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_addr_id_fkey" FOREIGN KEY ("addr_id") REFERENCES "Address"("addr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_acc_id_fkey" FOREIGN KEY ("acc_id") REFERENCES "Account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "Category"("cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_acc_id_fkey" FOREIGN KEY ("acc_id") REFERENCES "Account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_prodlist_id_fkey" FOREIGN KEY ("prodlist_id") REFERENCES "ProductList"("prodlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_acc_id_fkey" FOREIGN KEY ("acc_id") REFERENCES "Account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promotion"("promo_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "Category"("cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_acc_id_fkey" FOREIGN KEY ("acc_id") REFERENCES "Account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cus_id_fkey" FOREIGN KEY ("cus_id") REFERENCES "Customer"("cus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_acc_id_fkey" FOREIGN KEY ("acc_id") REFERENCES "Account"("acc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "Product"("prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_inv_id_fkey" FOREIGN KEY ("inv_id") REFERENCES "Inventory"("inv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
