import Autocomplete from "@material-ui/lab/Autocomplete";
import Mask from "react-input-mask";
import styled, { css } from "styled-components";

export const Content = styled.div`
  margin-bottom: 15px;
  label {
    width: 100%;
  }
  width: 100%;
`;

export const CheckBox = styled.label`
  top: 2px;
  padding: ${({ label }) => (label ? "0 25px" : "0")};
  margin: 0 0 0 0;
  width: ${({ label }) => (label ? "auto !important" : "18px !important")};
  height: ${({ label }) => (label ? "auto !important" : "18px !important")};
  display: inline-block;
  position: relative;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  label {
    margin-top: 2.5px;
    font-weight: 400;
  }
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  span {
    background: var(--light);
    border-radius: ${({ type }) => (type === "radiobox" ? "10px" : "3px")};
    border: 1px solid var(--default);
    position: absolute;
    top: 1px;
    left: 0;
    height: 18px;
    width: 18px;
    ::after {
      content: "";
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      margin-left: -3px;
      margin-top: -7px;
      width: 4px;
      height: 8px;
      border-width: 0 2px 2px 0 !important;
      transform: rotate(45deg);
      border: solid var(--default);
    }
  }
  input:checked ~ span:after {
    display: block;
  }
  input:disabled ~ span {
    border: 1px solid #e4e6ef !important;
    cursor: auto !important;
  }
`;

const inputCss = css`
  display: block;
  width: 100%;
  height: calc(1.5em + 1.3rem + 2px);
  padding: 0.65rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e2e5ec;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const InputText = styled.input`
  ${inputCss}
`;

export const InputMask = styled(Mask)`
  ${inputCss}
`;

export const Select = styled.select`
  ${inputCss}
`;

export const Textarea = styled.textarea`
  ${inputCss}
  height:auto;
`;

export const Required = styled.span`
  margin-left: 5px;
  color: var(--red);
`;

export const AutoComplete = styled(Autocomplete)`
  input {
    :focus {
      outline: none !important;
      border: none !important;
    }
  }
`;

export const SelectItemsContent = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

export const SelectItem = styled.span`
  background-color: var(--default);
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  font-size: 10px;
  border-radius: 2px;
  color: #fff;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    margin-left: 10px;
  }
`;

export const CheckboxItems = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

  ${({ direction }) => (direction ? `flex-direction:${direction}` : "")}
`;
