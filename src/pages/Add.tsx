import React, { useContext } from "react";
import AddItemBar from "../components/AddPageComponents/AddItemBar";
import AddItemList from "../components/AddPageComponents/AddItemList";
import { AddItemListProps } from "../types";
import { useItemManageDispatchContext } from "./ItemManage";
import { createContext } from "react";

export const AddItemDispatchContext = createContext<{
  handleToggleCheckBox: (addItem: AddItemListProps) => void;
} | null>(null);

export function useAddItemDispatchContext() {
  const context = useContext(AddItemDispatchContext);
  if (!context)
    throw new Error(
      "Add.tsx의 AddItemDispatchContext의 콘텍스트가 존재하지 않습니다."
    );
  return context;
}

const Add = () => {
  const { setAddItemList } = useItemManageDispatchContext();
  const handleToggleCheckBox = (addItem: AddItemListProps) => {
    setAddItemList((prevList: AddItemListProps[]) => {
      const updateList = prevList.map((item) =>
        item.id === addItem.id ? { ...item, isChecked: !item.isChecked } : item
      );
      return updateList;
    });
  };

  return (
    <div className="Add">
      <AddItemDispatchContext.Provider value={{ handleToggleCheckBox }}>
        <AddItemBar />
        <AddItemList />
      </AddItemDispatchContext.Provider>
    </div>
  );
};

export default Add;
