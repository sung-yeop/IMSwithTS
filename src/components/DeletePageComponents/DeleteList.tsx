import React from "react";
import { useItemListStateContext } from "../../App";
import Button from "../Button";
import { Item } from "../../types";
import DeleteItemFormat from "./DeleteItemFormat";
import { useItemManageDispatchContext } from "../../pages/ItemManage";
import { DeleteItemListProps } from "../../types";

// 화면에 렌더링되는 아이템이 너무 많을 수 있으므로 map 메서드를 이용한 순회보다는 삭제하고자 하는 아이템을 저장하는 배열을 생성
// 이후, 배열에 담긴 Id의 값을 모두 삭제

// export interface DeleteItemListProps {
//     id: string;
//     totalQuantity : number;
//     quantity: number;
//   }

const DeleteList = () => {
  const itemList = useItemListStateContext();
  const { setDeleteItemList } = useItemManageDispatchContext();
  const handleToggleCheckBox = (item: DeleteItemListProps) => {
    setDeleteItemList((prevList) => {
      const isExist = prevList.findIndex(
        (deleteItem) => deleteItem.id === item.id
      );
      const updateList: DeleteItemListProps[] = [...prevList];
      if (isExist !== -1) {
        updateList[isExist] = item;
        return [...updateList];
      } else {
        return [...updateList, item];
      }
    });
  };

  return (
    <div className="DeleteItemList">
      <Button text={"삭제"} onClickButton={() => {}} />
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
            <th>삭제 개수</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item: Item, index: number) => {
            return (
              <DeleteItemFormat
                key={item.id}
                index={index + 1}
                item={item}
                handleToggleCheckBox={handleToggleCheckBox}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteList;