// R13 Save Fix
// Add item_no before saving quotation_items

export function prepareQuotationItems(items = []) {
  return items.map((item, index) => ({
    ...item,
    item_no: index + 1
  }));
}
