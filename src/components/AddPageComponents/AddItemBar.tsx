import React from "react";
import { useItemManageDispatchContext } from "../../pages/ItemManage";
import { useState } from "react";
import Button from "../Button";

interface AddItemBar {
  isChecked: boolean;
  name: string;
  barcode: number | string;
  location: string;
  quantity: number | string;
  expDate: number | string;
}

const AddItemBar = () => {
  const { setAddItemList } = useItemManageDispatchContext();
  const [addItem, setAddItem] = useState<AddItemBar>({
    isChecked: false,
    name: "",
    barcode: "",
    location: "",
    quantity: "",
    expDate: "",
  });

  // AddItemBar의 인풋값 유효성 검사
  // Barcode, Quantity는 Number 타입이어야만함 -> 문제가 있으면 True / 문제가 없으면 False
  const validateInput = (name: string, value: string): boolean => {
    const validTargetNumber: string[] = ["barcode", "quantity"];
    if (validTargetNumber.includes(name) && isNaN(Number(value))) {
      return true;
    }
    return false;
  };

  // AddItemBar의 인풋값 유효성 검사
  // expDate의 포맷은 날짜 형식이어야 함 -> 문제가 있으면 True / 문제가 없으면 False
  const validateInputDate = (expDateInput: string): boolean => {
    if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(expDateInput)) {
      return true;
    }
    return false;
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (validateInput(name, value)) return;
    setAddItem({
      ...addItem,
      [name]: value,
    });
  };

  const handleClickAddButton = () => {
    if (validateInputDate(addItem.expDate as string)) return;

    const addItemId = `${addItem.barcode}-${addItem.location}-${new Date(
      addItem.expDate
    )}`;
    console.log(addItemId);

    setAddItemList((prevList) => {
      const sameItemIndex = prevList.findIndex((item) => item.id === addItemId);
      const updateList = [...prevList];
      console.log(sameItemIndex);
      if (sameItemIndex === -1) {
        return [
          ...prevList,
          {
            ["id"]: addItemId,
            ...addItem,
            ["barcode"]: Number(addItem.barcode),
            ["quantity"]: Number(addItem.quantity),
            ["expDate"]: new Date(addItem.expDate).getTime(),
          },
        ];
      }
      updateList[sameItemIndex].quantity =
        Number(updateList[sameItemIndex].quantity) + Number(addItem.quantity);
      return updateList;
    });

    setAddItem({
      isChecked: false,
      name: "",
      barcode: "",
      location: "",
      quantity: "",
      expDate: "",
    });
  };

  return (
    <div className="AddItemBar">
      <input
        name="name"
        value={addItem.name}
        onChange={onChangeInput}
        placeholder="이름"
      />
      <input
        name="barcode"
        value={addItem.barcode}
        onChange={onChangeInput}
        placeholder="바코드"
      />
      <input
        name="location"
        value={addItem.location}
        onChange={onChangeInput}
        placeholder="로케이션"
      />
      <input
        name="quantity"
        value={addItem.quantity}
        onChange={onChangeInput}
        placeholder="수량"
      />
      <input
        name="expDate"
        value={addItem.expDate}
        onChange={onChangeInput}
        placeholder="유툥기한"
      />
      <Button text={"재고 추가"} onClickButton={handleClickAddButton} />
    </div>
  );
};

export default AddItemBar;
