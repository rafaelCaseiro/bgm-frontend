import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const sm = css`
  padding: 0.55rem 0.75rem;
  font-size: 0.925rem;
  line-height: 1.35;
  border-radius: 0.42rem;
`;

const lg = css`
  padding: 0.825rem 1.42rem;
  font-size: 1.08rem;
  line-height: 1.5;
  border-radius: 0.42rem;
`;

const style = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  color: #3f4254;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.42rem;
  white-space: nowrap;
  ${({ notFull }) => (notFull ? "" : "width:100%;")}
  -webkit-transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out, -webkit-box-shadow 0.3s ease-in-out;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out, -webkit-box-shadow 0.3s ease-in-out;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    -webkit-box-shadow 0.3s ease-in-out;
  text-decoration: none !important;
  color: var(--${({ color }) => color});
  background-color: var(--${({ bg }) => bg});
  border-color: var(--${({ border }) => border});
  background-color: ${({ bg }) => bg};
  border-color: ${({ border }) => border};
  ${({ size }) => (size === "sm" ? sm : size === "ls" ? lg : "")}
`;

export const Button = styled.button`
  ${style}
  &:hover {
    ${({ dropdown }) => (dropdown ? "filter: none !important" : "")};
  }
`;

export const LinkButton = styled(Link)`
  ${style}
`;

export const LinkAliasButton = styled.a`
  ${style}
`;

const showDropdownCss = css`
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
  transform: translate(0, 17px);
  top: 21px;
  right: 0;
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const hideDropdownCss = css`
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 0px;
  opacity: 0;
  pointer-events: none;
`;

export const Dropdown = styled.div`
  right: auto;
  bottom: auto;
  border: 0 !important;
  min-width: 14rem;
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
  padding: 1rem 0;
  border-radius: 4px;
  z-index: 1;
  display: none;
  float: left;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  ${({ show }) => (show ? showDropdownCss : hideDropdownCss)}
  a,span {
    cursor: pointer;
    padding: 10px 5px;
    color: var(--text);
    transition: all 0.3s;
    margin: 0;
    padding-left: 15px;
    padding-right: 15px;
    :hover {
      color: var(--default);
      background-color: var(--light);
    }
  }
`;
