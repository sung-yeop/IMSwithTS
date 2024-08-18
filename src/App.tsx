import { useContext, useEffect, useReducer } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ItemManage from "./pages/ItemManage";
import OrderItemManage from "./pages/OrderItemManage";
import Sidebar from "./components/Sidebar";
import {
  Item,
  AddItemListProps,
  UpdateItemListProps,
  DeleteItemListProps,
} from "./types";
import { createContext } from "react";

type ItemListAction =
  | {
      type: "CREATE";
      data: AddItemListProps;
    }
  | {
      type: "UPDATE";
      data: UpdateItemListProps;
    }
  | {
      type: "DELETE";
      data: DeleteItemListProps;
    };

function reducerItemList(state: Item[], action: ItemListAction) {
  switch (action.type) {
    case "CREATE": {
      const isExist = state.findIndex((item) => item.id === action.data.id);
      const updateList = [...state];
      if (isExist !== -1) {
        console.log(
          "이미 존재하는 아이템의 개수 : ",
          updateList[isExist].quantity
        );
        updateList[isExist].quantity =
          Number(updateList[isExist].quantity) + Number(action.data.quantity);
        return updateList;
      } else {
        return [...updateList, action.data];
      }
    }
    case "UPDATE": {
      return [...state];
    }
    case "DELETE": {
      const updateList = state.map((item: Item) => {
        if (
          item.id === action.data.id &&
          item.quantity === action.data.DeleteQuantity
        ) {
          return null;
        } else if (
          item.id === action.data.id &&
          item.quantity > action.data.DeleteQuantity
        ) {
          return {
            ...item,
            quantity:
              Number(item.quantity) - Number(action.data.DeleteQuantity),
          };
        } else {
          return item;
        }
      });
      return updateList.filter((item: Item | null) => item !== null);
    }
  }
}
// function reducerOrderItemList(state, action) {}

export const ItemListStateContext = createContext<Item[] | null>(null);
export const ItemListDispatchContext = createContext<{
  handleAddItemList: (props: AddItemListProps) => void;
  handleUpdateItemList: (props: UpdateItemListProps) => void;
  handleDeleteItemList: (props: DeleteItemListProps) => void;
} | null>(null);

export function useItemListDispatchContext() {
  const dispatchItemList = useContext(ItemListDispatchContext);
  if (!dispatchItemList)
    throw new Error("ItemListDispatchContext에서 함수를 찾을 수 없습니다.");
  return dispatchItemList;
}

export function useItemListStateContext() {
  const stateItemList = useContext(ItemListStateContext);
  if (!stateItemList)
    throw new Error("ItemListStateContext에서 함수를 찾을 수 없습니다.");
  return stateItemList;
}

// export const OrderItemListStateContext = createContext();
// export const OrderItemListDispatchContext = createContext();

function App() {
  const [itemList, dispatchItemList] = useReducer(reducerItemList, []);
  // const [orderItemList, dispatchOrderItemList] = useReducer(
  //   reducerOrderItemList,
  //   []
  // );

  // dispatchItemList 정의
  const handleAddItemList = (props: AddItemListProps) => {
    dispatchItemList({
      type: "CREATE",
      data: {
        id: props.id,
        name: props.name,
        barcode: props.barcode,
        location: props.location,
        quantity: props.quantity,
        expDate: props.expDate,
        isChecked: props.isChecked,
      },
    });
  };

  const handleUpdateItemList = (props: UpdateItemListProps) => {
    dispatchItemList({
      type: "UPDATE",
      data: {
        id: props.id,
        currentLocation: props.currentLocation,
        updateLocation: props.updateLocation,
        updateQuantity: props.updateQuantity,
      },
    });
  };

  const handleDeleteItemList = (props: DeleteItemListProps) => {
    dispatchItemList({
      type: "DELETE",
      data: {
        id: props.id,
        DeleteQuantity: props.DeleteQuantity,
      },
    });
  };

  useEffect(() => {
    console.log("ItemList : ", itemList);
  }, [itemList]);

  return (
    <div className="App">
      <Sidebar />
      <ItemListStateContext.Provider value={itemList}>
        <ItemListDispatchContext.Provider
          value={{
            handleAddItemList,
            handleUpdateItemList,
            handleDeleteItemList,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ItemManage/*" element={<ItemManage />} />
            <Route path="/OrderItemManage/*" element={<OrderItemManage />} />
          </Routes>
        </ItemListDispatchContext.Provider>
      </ItemListStateContext.Provider>
    </div>
  );
}

export default App;
