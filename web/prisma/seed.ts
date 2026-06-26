import  {PrismaClient}  from '../src/generated/prisma/client'

const prisma = new PrismaClient({
  accelerateUrl: '',
  log: ['query', 'info', 'warn', 'error']
})

async function main() {
  // 1. Create Accounts
  const admin = await prisma.account.create({
    data: {
      acc_email: 'admin@sugarbloom.com',
      acc_phone: '09123456789',
      acc_fname: 'Admin',
      acc_lname: 'User',
      acc_type: 'admin'
    }
  })

  const staff = await prisma.account.create({
    data: {
      acc_email: 'staff@sugarbloom.com',
      acc_phone: '09123456780',
      acc_fname: 'Juan',
      acc_lname: 'Dela Cruz',
      acc_type: 'staff'
    }
  })

  const customer1 = await prisma.account.create({
    data: {
      acc_email: 'maria@sugarbloom.com',
      acc_phone: '09123456781',
      acc_fname: 'Maria',
      acc_lname: 'Santos',
      acc_type: 'customer'
    }
  })

  const customer2 = await prisma.account.create({
    data: {
      acc_email: 'pedro@sugarbloom.com',
      acc_phone: '09123456782',
      acc_fname: 'Pedro',
      acc_lname: 'Reyes',
      acc_type: 'customer'
    }
  })

  const customer3 = await prisma.account.create({
    data: {
      acc_email: 'ana@sugarbloom.com',
      acc_phone: '09123456783',
      acc_fname: 'Ana',
      acc_lname: 'Gonzales',
      acc_type: 'customer'
    }
  })

  // 2. Create Addresses
  const address1 = await prisma.address.create({
    data: {
      street: '123 Rizal Street',
      barangay: 'San Isidro',
      city: 'Makati',
      province: 'Metro Manila',
      landmarks: 'Near SM Makati'
    }
  })

  const address2 = await prisma.address.create({
    data: {
      street: '456 Mabini Road',
      barangay: 'Poblacion',
      city: 'Quezon City',
      province: 'Metro Manila',
      landmarks: 'Beside Mercury Drug'
    }
  })

  const address3 = await prisma.address.create({
    data: {
      street: '789 Bonifacio Ave',
      barangay: 'San Antonio',
      city: 'Pasig',
      province: 'Metro Manila',
      landmarks: 'Across City Hall'
    }
  })

  // 3. Create Customers (connect to accounts and addresses)
  await prisma.customer.create({
    data: {
      cus_name: 'Maria Santos',
      cus_phone: '09123456781',
      acc_id: customer1.acc_id,
      addr_id: address1.addr_id
    }
  })

  await prisma.customer.create({
    data: {
      cus_name: 'Pedro Reyes',
      cus_phone: '09123456782',
      acc_id: customer2.acc_id,
      addr_id: address2.addr_id
    }
  })

  await prisma.customer.create({
    data: {
      cus_name: 'Ana Gonzales',
      cus_phone: '09123456783',
      acc_id: customer3.acc_id,
      addr_id: address3.addr_id
    }
  })

  // 4. Create Categories
  const cakes = await prisma.category.create({
    data: {
      cat_name: 'Cakes',
      acc_id: admin.acc_id
    }
  })

  const cupcakes = await prisma.category.create({
    data: {
      cat_name: 'Cupcakes',
      acc_id: admin.acc_id
    }
  })

  const pastries = await prisma.category.create({
    data: {
      cat_name: 'Pastries',
      acc_id: admin.acc_id
    }
  })

  // 5. Create Product Lists
  const classicCakes = await prisma.productList.create({
    data: {
      prodlist_name: 'Classic Cakes',
      prodlist_status: 'Active',
      cat_id: cakes.cat_id,
      acc_id: admin.acc_id
    }
  })

  const premiumCakes = await prisma.productList.create({
    data: {
      prodlist_name: 'Premium Cakes',
      prodlist_status: 'Active',
      cat_id: cakes.cat_id,
      acc_id: admin.acc_id
    }
  })

  // 6. Create Promotions
  const promo1 = await prisma.promotion.create({
    data: {
      promo_code: 'WELCOME10',
      promo_type: 'percent',
      promo_value: 10,
      promo_start_date: new Date('2024-01-01'),
      promo_end_date: new Date('2024-12-31'),
      promo_status: 'active'
    }
  })

  const promo2 = await prisma.promotion.create({
    data: {
      promo_code: 'CHRISTMAS500',
      promo_type: 'fixed',
      promo_value: 500,
      promo_start_date: new Date('2024-12-01'),
      promo_end_date: new Date('2024-12-25'),
      promo_status: 'schedule'
    }
  })

  // 7. Create Products
  await prisma.product.create({
    data: {
      prod_price: 850.00,
      prod_stock: 10,
      prod_status: 'Available',
      prodlist_id: classicCakes.prodlist_id,
      acc_id: admin.acc_id,
      promo_id: promo1.promo_id
    }
  })

  await prisma.product.create({
    data: {
      prod_price: 1200.00,
      prod_stock: 5,
      prod_status: 'Available',
      prodlist_id: premiumCakes.prodlist_id,
      acc_id: admin.acc_id
    }
  })

  await prisma.product.create({
    data: {
      prod_price: 350.00,
      prod_stock: 20,
      prod_status: 'Available',
      prodlist_id: classicCakes.prodlist_id,
      acc_id: admin.acc_id
    }
  })

  // 8. Create Inventory
  await prisma.inventory.create({
    data: {
      inv_name: 'All-Purpose Flour',
      inv_threshold: 10,
      inv_qty: 50,
      inv_status: 'in_stock',
      expiry_date: new Date('2024-12-31'),
      cat_id: cakes.cat_id,
      acc_id: admin.acc_id
    }
  })

  await prisma.inventory.create({
    data: {
      inv_name: 'Butter',
      inv_threshold: 5,
      inv_qty: 3,
      inv_status: 'low_stock',
      expiry_date: new Date('2024-07-15'),
      cat_id: cupcakes.cat_id,
      acc_id: admin.acc_id
    }
  })

  await prisma.inventory.create({
    data: {
      inv_name: 'Sugar',
      inv_threshold: 20,
      inv_qty: 100,
      inv_status: 'in_stock',
      expiry_date: new Date('2025-06-30'),
      cat_id: pastries.cat_id,
      acc_id: admin.acc_id
    }
  })

  // 9. Create Orders
  const order1 = await prisma.order.create({
    data: {
      order_type: 'Online',
      order_payment_status: 'Paid',
      order_payment_mode: 'E_wallet',
      order_total: 1700.00,
      order_amount: 1700.00,
      order_status: 'Completed',
      cus_id: 1,
      acc_id: admin.acc_id
    }
  })

  // 10. Create Order Items
  await prisma.orderItem.create({
    data: {
      orditem_qty: 2,
      orditem_total: 1700.00,
      prod_id: 1,
      order_id: order1.order_id
    }
  })

  console.log('✅ Database seeded successfully! 🎂')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })