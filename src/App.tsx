import { useReducer } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ItemManage from "./pages/ItemManage";
import OrderItemManage from "./pages/OrderItemManage";
import { Item, UpdateItemListProps, DeleteItemListProps } from "./types";
import { createContext } from "react";

type Action =
  | {
      type: "CREATE";
      data: Item;
    }
  | {
      type: "UPDATE";
      data: UpdateItemListProps;
    }
  | {
      type: "DELETE";
      data: DeleteItemListProps;
    };

function reducerItemList(state: Item[], action: Action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.data];
    }
    case "UPDATE": {
      return [...state];
    }
    case "DELETE": {
      return [...state];
    }
  }
}
// function reducerOrderItemList(state, action) {}

export const ItemListStateContext = createContext<Item[] | null>(null);
export const ItemListDispatchContext = createContext<{
  addItemList: (props: Item) => void;
  updateItemList: (props: UpdateItemListProps) => void;
  deleteItemList: (props: DeleteItemListProps) => void;
} | null>(null);

// export const OrderItemListStateContext = createContext();
// export const OrderItemListDispatchContext = createContext();

function App() {
  const [itemList, dispatchItemList] = useReducer(reducerItemList, []);
  // const [orderItemList, dispatchOrderItemList] = useReducer(
  //   reducerOrderItemList,
  //   []
  // );

  // dispatchItemList 정의
  const addItemList = (props: Item) => {
    dispatchItemList({
      type: "CREATE",
      data: {
        id: props.id,
        name: props.name,
        barcode: props.barcode,
        location: props.location,
        quantity: props.quantity,
        expiration_date: props.expiration_date,
      },
    });
  };

  const updateItemList = (props: UpdateItemListProps) => {
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

  const deleteItemList = (props: DeleteItemListProps) => {
    dispatchItemList({
      type: "DELETE",
      data: {
        id: props.id,
        quantity: props.quantity,
      },
    });
  };

  return (
    <div className="App">
      <ItemListStateContext.Provider value={itemList}>
        <ItemListDispatchContext.Provider
          value={{ addItemList, updateItemList, deleteItemList }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ItemManage" element={<ItemManage />} />
            <Route path="/OrderItemManage" element={<OrderItemManage />} />
          </Routes>
        </ItemListDispatchContext.Provider>
      </ItemListStateContext.Provider>
    </div>
  );
}

export default App;
