import { useState, createRef } from "react";
import { useOutsideClick } from "../../services/outsideClick";
import { ArrowIcon } from "../ArrowIcon";
import {
  Button as ButtonStyle,
  LinkButton,
  Dropdown,
  LinkAliasButton,
} from "./style";

export function Button(props) {
  const ref = createRef();
  const [show, setShow] = useState(false);

  useOutsideClick(ref, () => {
    setShow(false);
  });

  return props.href ? (
    <LinkAliasButton {...props}>{props.children}</LinkAliasButton>
  ) : props.to ? (
    <LinkButton {...props}>{props.children}</LinkButton>
  ) : (
    <ButtonStyle
      dropdown={props.dropdown}
      {...props}
      onClick={
        props.dropdown
          ? () => setShow((prevState) => !prevState)
          : props.onClick
      }
    >
      {props.children}
      {props.dropdown && props.loading === "false"
        ? [(" ", (<ArrowIcon key="arrow" show={show} />))]
        : null}
      <Dropdown ref={ref} show={show}>
        {props?.dropdown}
      </Dropdown>
    </ButtonStyle>
  );
}
