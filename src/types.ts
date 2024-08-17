// Item Info
export interface Item {
  id: string;
  name: string;
  barcode: number | string;
  location: string;
  quantity: number | string;
  expDate: number | string; // 타임스탬프로 저장
}

// App.tsx - dispatchItemList에서 정의된 Props 타입 정리
export interface AddItemListProps extends Item {
  isChecked: boolean;
}

export interface UpdateItemListProps {
  id: string;
  currentLocation: string;
  updateLocation: string;
  updateQuantity: number;
}

export interface DeleteItemListProps {
  id: string;
  DeleteQuantity: number | string;
}

// OrderItem Info
export type OrderItem = Omit<Item, "location">;
