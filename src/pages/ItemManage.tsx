import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Add from "./Add";
import Update from "./Update";
import Delete from "./Delete";
import { createContext } from "react";
import {
  DeleteItemListProps,
  UpdateItemListProps,
  AddItemListProps,
} from "../types";

// Context 생성
export const ItemManageStateContext = createContext<{
  addItemList: AddItemListProps[];
  updateItemList: UpdateItemListProps[];
  deleteItemList: DeleteItemListProps[];
} | null>(null);

export const ItemManageDispatchContext = createContext<{
  setAddItemList: React.Dispatch<React.SetStateAction<AddItemListProps[]>>;
  setUpdateItemList: React.Dispatch<
    React.SetStateAction<UpdateItemListProps[]>
  >;
  setDeleteItemList: React.Dispatch<
    React.SetStateAction<DeleteItemListProps[]>
  >;
} | null>(null);

// Context 훅 생성
export function useItemManageStateContext() {
  const manageStateContext = useContext(ItemManageStateContext);
  if (!manageStateContext)
    throw new Error("ItemManage.tsx의 ItemManageStateContext가 없습니다.");
  return manageStateContext;
}

export function useItemManageDispatchContext() {
  const manageDispatchContext = useContext(ItemManageDispatchContext);
  if (!manageDispatchContext)
    throw new Error("ItemManage.tsx의 ItemManageDispatchContext가 없습니다.");
  return manageDispatchContext;
}

const ItemManage = () => {
  const [addItemList, setAddItemList] = useState<AddItemListProps[]>([]);
  const [updateItemList, setUpdateItemList] = useState<UpdateItemListProps[]>(
    []
  );
  const [deleteItemList, setDeleteItemList] = useState<DeleteItemListProps[]>(
    []
  );

  // For Test
  useEffect(() => {
    console.log("addItemList 변경 감지 : ", addItemList);
  }, [addItemList]);

  useEffect(() => {
    console.log("deleteItemList 변경 감지 : ", deleteItemList);
  }, [deleteItemList]);

  return (
    <div className="ItemManage">
      <ItemManageStateContext.Provider
        value={{ addItemList, updateItemList, deleteItemList }}
      >
        <ItemManageDispatchContext.Provider
          value={{ setAddItemList, setUpdateItemList, setDeleteItemList }}
        >
          <Routes>
            <Route path="/Add" element={<Add />} />
            <Route path="/Update" element={<Update />} />
            <Route path="/Delete" element={<Delete />} />
          </Routes>
        </ItemManageDispatchContext.Provider>
      </ItemManageStateContext.Provider>
    </div>
  );
};

export default ItemManage;
