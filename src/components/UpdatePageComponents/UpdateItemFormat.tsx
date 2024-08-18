import React, { useEffect, useState } from "react";
import { Item } from "../../types";
import { useItemManageDispatchContext } from "../../pages/ItemManage";
import { UpdateItemListProps } from "../../types";

// export interface Item {
//   id: string;
//   name: string;
//   barcode: number | string;
//   location: string;
//   quantity: number | string;
//   expDate: number | string; // 타임스탬프로 저장
// }

// export interface UpdateItemListProps {
//   id: string;
//   currentLocation: string;
//   updateLocation: string;
//   updateQuantity: number;
// }

interface Props {
  index: number;
  item: Item;
  updateRef: boolean;
}

const UpdateItemFormat = (props: Props) => {
  const { id, name, barcode, location, quantity, expDate } = props.item;
  const [updateInfo, setUpdateInfo] = useState<UpdateItemListProps>({
    id: id,
    currentLocation: location,
    updateLocation: "",
    updateQuantity: 0,
  });
  const date = new Date(expDate);
  const exp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;

  const { setUpdateItemList } = useItemManageDispatchContext();

  const handleUpdateInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "updateQuantity" && value > quantity) {
      alert("이동 수량이 보유 수량보다 많습니다.");
      return;
    }

    setUpdateInfo({
      ...updateInfo,
      [name]: value,
    });
  };

  // For Log
  useEffect(() => {
    setUpdateItemList((prevList: UpdateItemListProps[]) => {
      const findTargetIndex = prevList.findIndex(
        (item) => item.id === updateInfo.id
      );
      const updateList = [...prevList];
      if (findTargetIndex !== -1) {
        updateList[findTargetIndex] = updateInfo;
        return updateList;
      } else {
        return [...updateList, updateInfo];
      }
    });
    console.log("updateInfo : ", updateInfo);
  }, [updateInfo]);

  useEffect(() => {
    setUpdateInfo({
      id: id,
      currentLocation: location,
      updateLocation: "",
      updateQuantity: 0,
    });
  }, [props.updateRef]);

  return (
    <tr>
      <td>{props.index}</td>
      <td>{name}</td>
      <td>{barcode}</td>
      <td>{location}</td>
      <td>{quantity}</td>
      <td>{exp}</td>
      <td>
        <input
          name={"updateLocation"}
          value={updateInfo.updateLocation}
          onChange={handleUpdateInfo}
        />
        <input
          name={"updateQuantity"}
          value={updateInfo.updateQuantity}
          onChange={handleUpdateInfo}
        />
      </td>
    </tr>
  );
};

export default UpdateItemFormat;
