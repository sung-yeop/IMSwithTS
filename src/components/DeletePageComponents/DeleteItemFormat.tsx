import React, { useEffect, useState } from "react";
import { Item, DeleteItemListProps } from "../../types";
import { useCallback } from "react";

interface Props {
  index: number;
  item: Item;
  handleToggleCheckBox: (item: DeleteItemListProps) => void;
  deleteRef: boolean;
}

const DeleteItemFormat = (props: Props) => {
  const date = new Date(props.item.expDate);
  const exp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
  const [deleteInfo, setDeleteInfo] = useState<DeleteItemListProps>({
    id: "",
    DeleteQuantity: "",
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleDeleteCheckBox = () => {
    setDeleteInfo({
      ...deleteInfo,
      id: props.item.id,
    });
  };

  const handleDeleteQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNaN(Number(value))) {
      alert("숫자만 입력 가능합니다.");
      return;
    }
    if (Number(value) > Number(props.item.quantity)) return;
    setDeleteInfo({
      id: props.item.id,
      DeleteQuantity: Number(value),
    });
  };

  useEffect(() => {
    if (deleteInfo.id === "") return;
    if (Number(deleteInfo.DeleteQuantity) > 0) setIsChecked(true);
    else setIsChecked(false);
    props.handleToggleCheckBox(deleteInfo);
  }, [deleteInfo]);

  useEffect(() => {
    setDeleteInfo({
      id: "",
      DeleteQuantity: "",
    });
  }, [props.deleteRef]);

  return (
    <tr>
      <td>
        <input
          type="checkBox"
          checked={isChecked}
          onChange={handleDeleteCheckBox}
        />
      </td>
      <td>{props.index}</td>
      <td>{props.item.name}</td>
      <td>{props.item.barcode}</td>
      <td>{props.item.location}</td>
      <td>{props.item.quantity}</td>
      <td>{exp}</td>
      <td>
        <input
          value={deleteInfo.DeleteQuantity}
          onChange={handleDeleteQuantity}
        />
      </td>
    </tr>
  );
};

export default DeleteItemFormat;
