import React from "react";
import { AddItemListProps } from "../../types";
import { useAddItemDispatchContext } from "../../pages/Add";

type Props = {
  index: number;
  item: AddItemListProps;
};

const AddItemFormat = (props: Props) => {
  const date = new Date(props.item.expDate);
  const exp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
  const { handleToggleCheckBox } = useAddItemDispatchContext();

  return (
    <tr>
      <td>
        <input
          type="checkBox"
          onChange={() => handleToggleCheckBox(props.item)}
        />
      </td>
      <td>{props.index}</td>
      <td>{props.item.name}</td>
      <td>{props.item.barcode}</td>
      <td>{props.item.location}</td>
      <td>{props.item.quantity}</td>
      <td>{exp}</td>
    </tr>
  );
};

export default AddItemFormat;
