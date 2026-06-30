export interface PosCustomer {
  cus_id: number;
  cus_name: string;
  cus_phone?: string;
}

export const MOCK_CUSTOMERS: PosCustomer[] = [
  { cus_id: 1001, cus_name: "Maria Santos", cus_phone: "+63 917 123 4567" },
  { cus_id: 1002, cus_name: "James Yap", cus_phone: "+63 918 765 4321" },
  { cus_id: 1003, cus_name: "Sarah Lim", cus_phone: "+63 920 888 9999" },
  { cus_id: 1004, cus_name: "Ana Cruz", cus_phone: "+63 921 555 1234" },
  { cus_id: 1005, cus_name: "Mark Reyes", cus_phone: "+63 922 333 9876" },
];

export function findCustomerById(id: string): PosCustomer | undefined {
  const trimmed = id.trim();
  if (!trimmed) return undefined;
  return MOCK_CUSTOMERS.find((c) => String(c.cus_id) === trimmed);
}
