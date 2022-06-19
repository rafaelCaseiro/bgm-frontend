import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  box-shadow: 0 0 13px 0 rgb(82 63 105 / 5%);
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const TableContent = styled.table`
  border-collapse: collapse;
  th,
  td {
    padding: 16px 10px;
    text-align: left;
  }
  th {
    position: relative;
    span {
      font-weight: 400;
      color: var(--text);
    }
  }
  td {
    span {
      font-weight: 300;
      color: var(--gray);
    }
  }
  td,
  th {
    :first-child {
      padding-left: 25px !important;
    }
  }
`;

export const Title = styled.span`
  display: flex;
  align-items: center;
  ${({ filter }) => !!filter && "cursor:pointer;"}
`;

const showDropdownCss = css`
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
  transform: translate(0, 36px);
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
  min-width: ${({ filter }) => (filter === "date" ? "350px" : "300px")};
  background-clip: padding-box;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  ${({ show }) => (show ? showDropdownCss : hideDropdownCss)}
`;

export const Sort = styled.span`
  cursor: pointer;
  padding: 10px 5px;
  color: var(--text);
  transition: all 0.3s;
  margin: 0;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    color: var(--default);
    background-color: var(--light);
  }
`;

export const Header = styled.thead`
  tr {
    border-bottom: solid 1px var(--gray);
  }
`;

export const CheckboxCell = styled.th`
  width: 20px;
`;

export const Index = styled.th`
  width: 70px;
`;

export const EditAccess = styled.th`
  width: 120px;
  span {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  svg {
    cursor: pointer;
    :hover {
      path {
        fill: var(--red);
      }
    }
  }
`;

export const Body = styled.tbody`
  tr {
    border-bottom: solid 1px var(--light);
  }
`;

export const EmptyTable = styled.td`
  text-align: center !important;
  span {
    font-weight: 500 !important;
  }
`;

const active = css`
  background-color: rgba(29, 201, 183, 0.1);
  color: #1dc9b7 !important;
`;

const inactive = css`
  background-color: rgba(253, 57, 122, 0.1);
  color: #fd397a !important;
`;

export const Status = styled.span`
  padding: 0.55rem 0.75rem;
  font-size: 0.925rem;
  line-height: 1.35;
  border-radius: 0.42rem;
  ${({ status }) => (status ? active : inactive)};
`;

export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TotalItems = styled.span`
  padding-right: 30px;
  color: var(--text);
`;

export const ButtonContent = styled.td`
  display: flex;
  justify-content: center;
`;
