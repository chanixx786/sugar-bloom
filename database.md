ACCOUNT
acc_id
acc_email
acc_phone
acc_fname
acc_lname
created_at
updated_at
acc_type [staff, customer, admin]


ADDRESS
addr_id (PK)
cus_id (FK)
street
barangay
city
province
landmarks

CUSTOMER
cus_id (PK)
acc_id	 (FK)
Addr_id (FK)
cus_name
cus_phone

CATEGORY
cat_id (PK)
acc_id (FK)
cat_name
created_at
updated_at


PRODUCT _LIST
prodlist_id (PK)
cat_id (FK)
acc_id (FK)
prodlist_name
prodlist_status (Active, Inactive)
created_at
updated_at


PROMOTION
promo_id (FK)
promo_code 
promo_type  (percent, fixed, bundle)
promo_value
promo_start_date
promo_end_date
promo_status (active, schedule, expired)




PRODUCT
prod_id (PK)
prodlist_id (FK)
acc_id (FK)
promo_id (FK)
prod_price
prod_stock
prod_status (Available, Sold, Discarded, Reserved )
updated_at


INVENTORY_ITEM
inv_item_id
inv_item_name

INVENTORY
inv_id (FK)
cat_id (FK)
acc_id (FK)
inv_item_id(FK)
inv_thresold
inv_qty
inv_status (low stock, out of stock in stock)
expiry_date
updated_at
created_at



ORDER
order_id (PK)
cus_id (FK)
acc_id (FK)
order_type (Walkin, Online)
order_payment_status 
order_payment_mode (E-wallet, Cash)
order_total
order_amount
order_status (Completed, Pending, Out on Delivery, Cancelled
Created_at


ORDER_ITEM
orditem_id (FK)
prod_id (FK)
order_id (FK)
Orditem_qty
orditem_total
Created_at




EXPENSES
exp_id (PK)
inv_id (FK)
exp_amount
exp_date_purchased
exp_vendor (eg., Metro, gaisano)


DELIVERY
deliv_id (PK)
order_id (FK)
deliv_cost















