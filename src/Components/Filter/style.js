import styled from "styled-components";
import { Button } from "../Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    padding: 5px 15px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--default);
  }
  input,
  select {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;

export const FilterContent = styled.form`
  padding: 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RangeContent = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-top: 10px;
    display: flex;
    input {
      :nth-child(2) {
        border-radius: 0;
        border-left: none;
        border-right: none;
        :focus {
          border-left: solid 1px var(--default);
          border-right: solid 1px var(--default);
        }
      }
    }
  }
`;

export const DateButton = styled(Button)`
  width: 100%;
  border-radius: 4px !important;
`;
