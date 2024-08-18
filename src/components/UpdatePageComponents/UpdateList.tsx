import React from "react";
import { useItemListDispatchContext, useItemListStateContext } from "../../App";
import UpdateItemFormat from "./UpdateItemFormat";
import { Item } from "../../types";
import Button from "../Button";
import { useItemManageStateContext } from "../../pages/ItemManage";
import { useRef } from "react";

const UpdateList = () => {
  const itemList = useItemListStateContext();
  const { handleUpdateItemList } = useItemListDispatchContext();
  const { updateItemList } = useItemManageStateContext();
  const updateRef = useRef(false);

  const onClickSaveButton = () => {
    updateItemList.map((updateItem) => {
      return handleUpdateItemList(updateItem);
    });
    updateRef.current = !updateRef.current;
  };

  return (
    <div className="UpdateList">
      <Button text="저장" onClickButton={onClickSaveButton} />
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>바코드</th>
            <th>로케이션</th>
            <th>수량</th>
            <th>유통기한</th>
            <th>이동 로케이션</th>
            <th>이동 수량</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item: Item, index: number) => (
            <UpdateItemFormat
              key={item.id}
              index={index + 1}
              item={item}
              updateRef={updateRef.current}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateList;
