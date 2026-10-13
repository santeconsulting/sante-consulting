// SANTE SYSTEM R12 Patch
export function prepareQuotationPayload(formData, customer) {
 if (!customer) throw new Error("กรุณาเลือกลูกค้าก่อนบันทึกใบเสนอราคา");
 return {
  ...formData,
  customer_name_snapshot: customer.company_name || customer.customer_name || customer.name || "ไม่ระบุชื่อ",
  customer_address_snapshot: customer.address || "",
  customer_tax_id_snapshot: customer.tax_id || "",
  customer_phone_snapshot: customer.phone || "",
  customer_email_snapshot: customer.email || ""
 };
}
