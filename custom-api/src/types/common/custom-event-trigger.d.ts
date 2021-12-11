interface eventData_UpdateAvailableQtyOnInsertTransactionItem {
  old?: any;
  new: {
    inventory_product_id: string;
    selling_price: number;
    variant: string;
    discount: number;
    product_name: string;
    subtotal: number;
    transaction_invoice_number: string;
    updated_at: Date;
    created_at: Date;
    id: string;
    purchase_qty: number;
    capital_price: number;
    profit: number;
  };
}
