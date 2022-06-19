import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: var(--white);
  border-radius: 0.3rem;
  box-shadow: 0px 0px 20px 0px rgb(76 87 125 / 2%);
  margin-bottom: 15px;
`;

export const Main = styled.div`
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 0.7rem;
  color: var(--text);
`;

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  list-style-type: none;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  span,
  a {
    padding: 0 0.35rem 0 0;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    transition: all 0.3s;
  }
  svg {
    width: 1.3rem;
    height: 1.3rem;
    path {
      fill: var(--text);
    }
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.35rem;
  ::after {
    background: var(--text);
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    content: " ";
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  button,
  a {
    margin-left: 10px;
  }
`;
