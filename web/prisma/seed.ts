
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();

async function main() {

  // ── ACCOUNTS ──────────────────────────────────────────────
  const adminAccount = await prisma.account.upsert({
    where: { acc_email: 'admin@sugarbloom.com' },
    update: {},
    create: {
      acc_email: 'admin@sugarbloom.com',
      acc_phone: '09171234567',
      acc_fname: 'Admin',
      acc_lname: 'User',
      acc_type: 'admin',
    },
  })

  const staffAccount = await prisma.account.upsert({
    where: { acc_email: 'staff@sugarbloom.com' },
    update: {},
    create: {
      acc_email: 'staff@sugarbloom.com',
      acc_phone: '09189876543',
      acc_fname: 'Jane',
      acc_lname: 'Doe',
      acc_type: 'staff',
    },
  })

  const customerAccount = await prisma.account.upsert({
    where: { acc_email: 'customer@example.com' },
    update: {},
    create: {
      acc_email: 'customer@example.com',
      acc_phone: '09201112233',
      acc_fname: 'Maria',
      acc_lname: 'Santos',
      acc_type: 'customer',
    },
  })

  // ── ADDRESS ───────────────────────────────────────────────
  const address = await prisma.address.create({
    data: {
      street: '123 Mango Ave',
      barangay: 'Lahug',
      city: 'Cebu City',
      province: 'Cebu',
      landmarks: 'Near IT Park',
    },
  })

  // ── CUSTOMER ──────────────────────────────────────────────
  const customer = await prisma.customer.create({
    data: {
      cus_name: 'Maria Santos',
      cus_phone: '09201112233',
      acc_id: customerAccount.acc_id,
      addr_id: address.addr_id,
    },
  })

  // ── CATEGORIES ────────────────────────────────────────────
  const cakesCategory = await prisma.category.create({
    data: {
      cat_name: 'Cakes',
      acc_id: adminAccount.acc_id,
    },
  })

  const pastryCategory = await prisma.category.create({
    data: {
      cat_name: 'Pastries',
      acc_id: adminAccount.acc_id,
    },
  })

  // ── PRODUCT LISTS ─────────────────────────────────────────
  const birthdayCakes = await prisma.productList.create({
    data: {
      prodlist_name: 'Birthday Cakes',
      prodlist_status: 'Active',
      cat_id: cakesCategory.cat_id,
      acc_id: adminAccount.acc_id,
    },
  })

  const croissants = await prisma.productList.create({
    data: {
      prodlist_name: 'Croissants',
      prodlist_status: 'Active',
      cat_id: pastryCategory.cat_id,
      acc_id: adminAccount.acc_id,
    },
  })

  // ── PROMOTION ─────────────────────────────────────────────
  const promo = await prisma.promotion.create({
    data: {
      promo_code: 'BLOOM10',
      promo_type: 'percent',
      promo_value: 10.00,
      promo_start_date: new Date('2026-06-01'),
      promo_end_date: new Date('2026-12-31'),
      promo_status: 'active',
    },
  })

  // ── PRODUCTS ──────────────────────────────────────────────
  const chocolateCake = await prisma.product.create({
    data: {
      prod_price: 850.00,
      prod_stock: 10,
      prod_status: 'Available',
      prodlist_id: birthdayCakes.prodlist_id,
      acc_id: adminAccount.acc_id,
      promo_id: promo.promo_id,
    },
  })

  const butterCroissant = await prisma.product.create({
    data: {
      prod_price: 120.00,
      prod_stock: 50,
      prod_status: 'Available',
      prodlist_id: croissants.prodlist_id,
      acc_id: adminAccount.acc_id,
    },
  })

  // ── INVENTORY ─────────────────────────────────────────────
  const flourInventory = await prisma.inventory.create({
    data: {
      inv_name: 'All-Purpose Flour',
      inv_threshold: 10,
      inv_qty: 50,
      inv_status: 'in_stock',
      expiry_date: new Date('2027-01-01'),
      cat_id: cakesCategory.cat_id,
      acc_id: adminAccount.acc_id,
    },
  })

  // ── EXPENSES ──────────────────────────────────────────────
  await prisma.expense.create({
    data: {
      exp_amount: 1500.00,
      exp_date_purchased: new Date('2026-06-01'),
      exp_vendor: 'Metro Gaisano Supermart',
      inv_id: flourInventory.inv_id,
    },
  })

  // ── ORDER ─────────────────────────────────────────────────
  const order = await prisma.order.create({
    data: {
      order_type: 'Online',
      order_payment_status: 'Paid',
      order_payment_mode: 'E_wallet',
      order_total: 970.00,
      order_amount: 1000.00,
      order_status: 'Pending',
      cus_id: customer.cus_id,
      acc_id: staffAccount.acc_id,
    },
  })

  // ── ORDER ITEMS ───────────────────────────────────────────
  await prisma.orderItem.create({
    data: {
      orditem_qty: 1,
      orditem_total: 850.00,
      prod_id: chocolateCake.prod_id,
      order_id: order.order_id,
    },
  })

  await prisma.orderItem.create({
    data: {
      orditem_qty: 1,
      orditem_total: 120.00,
      prod_id: butterCroissant.prod_id,
      order_id: order.order_id,
    },
  })

  // ── DELIVERY ──────────────────────────────────────────────
  await prisma.delivery.create({
    data: {
      deliv_cost: 80.00,
      order_id: order.order_id,
    },
  })

  console.log('✅ Seed complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })