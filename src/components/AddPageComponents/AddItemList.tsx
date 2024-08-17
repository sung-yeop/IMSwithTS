import React, { useEffect, useRef } from "react";
import {
  useItemManageDispatchContext,
  useItemManageStateContext,
} from "../../pages/ItemManage";
import AddItemFormat from "./AddItemFormat";
import { AddItemListProps } from "../../types";
import Button from "../Button";
import { useItemListDispatchContext } from "../../App";

const AddItemList = () => {
  const { addItemList } = useItemManageStateContext();
  const { setAddItemList } = useItemManageDispatchContext();
  const handleClickDeleteButton = () => {
    setAddItemList((prevList) => {
      return prevList.filter((item) => !item.isChecked);
    });
  };

  const { handleAddItemList } = useItemListDispatchContext();
  const handleClickSaveButton = () => {
    console.log("Before addItemList : ", addItemList);
    addItemList.map((addItem) => {
      handleAddItemList(addItem);
    });
    setAddItemList([]);
    console.log("After addItemList : ", addItemList);
  };

  return (
    <div className="AddItemList">
      <Button text={"삭제"} onClickButton={handleClickDeleteButton} />
      <Button text={"저장"} onClickButton={handleClickSaveButton} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>번호</th>
            <th>상품명</th>
            <th>바코드</th>
            <th>로케이션</th>
            <th>수량</th>
            <th>유통기한</th>
          </tr>
        </thead>
        <tbody>
          {addItemList.map((item: AddItemListProps, index: number) => {
            return (
              <AddItemFormat key={item.id} index={index + 1} item={item} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddItemList;
