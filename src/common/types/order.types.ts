export enum ORDER_STATUS {
  pending = 'pending',
  placed = 'placed',
  shipping = 'shipping',
  delivered = 'delivered',
  canceled = 'canceled',
}

export enum PAYMENT_METHOD {
  cash = 'cash',
  card = 'card',
}

export enum DISCOUNT_TYPE {
  'fixedAmount' = 'fixed',
  'percentage' = 'percentage',
}
