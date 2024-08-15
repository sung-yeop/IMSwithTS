import React from "react";

interface Props {
  text: string;
  onClickButton: () => void;
}

const Button = (props: Props) => {
  return <button onClick={props.onClickButton}>{props.text}</button>;
};

export default Button;
