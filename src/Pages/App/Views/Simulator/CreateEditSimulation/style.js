import styled from "styled-components";
import { Button } from "../../../../../Components/Button";
import { Input } from "../../../../../Components/Input";

export const Td = styled.td`
  padding: 0 !important;
  display: table-cell;
  vertical-align: middle;
  ${({ isButton }) => (isButton ? "padding-left:16px !important" : "")}
`;

export const InputTable = styled(Input)`
  border-radius: 0 !important;
  border-color: white !important;
  height: 25px !important;
  &:focus {
    border-color: var(--default) !important;
  }
  ${({ error }) => (error ? "border-color: var(--danger) !important" : "")}
`;

export const ShowColumns = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px !important;
  height: 25px !important;
`;
