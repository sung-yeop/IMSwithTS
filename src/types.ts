// Item Info
export interface Item {
  id: string;
  name: string;
  barcode: number;
  location: string;
  quantity: number;
  expiration_date: number; // 타임스탬프로 저장
}

// App.tsx - dispatchItemList에서 정의된 Props 타입 정리
export interface UpdateItemListProps {
  id: string;
  currentLocation: string;
  updateLocation: string;
  updateQuantity: number;
}

export interface DeleteItemListProps {
  id: string;
  quantity: number;
}

// OrderItem Info
export type OrderItem = Omit<Item, "location">;
