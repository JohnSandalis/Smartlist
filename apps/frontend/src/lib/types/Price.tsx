export interface Price {
  barcode?: string;
  merchant_uuid: number;
  price: number;
  price_normalized: number;
  date: string;
  unit: string;
}
