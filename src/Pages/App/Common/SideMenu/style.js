import styled from "styled-components";

export const Container = styled.div`
  width: 265px;
  transition: width ease;
  position: fixed;
  left: 50px;
  top: 110px;
  bottom: 40px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.3rem;
  border: 0;
  box-shadow: 0px 0px 20px 0px rgb(76 87 125 / 2%);
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
`;

export const Content = styled.div`
  flex: 1 0 auto;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
`;

export const MenuContainer = styled.div`
  overflow-y: hidden;
  position: relative;
  --scrollbar-space: 0.5rem;
  padding-right: 1rem;
  margin-right: -1rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`;

export const MenuContent = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  font-weight: 500 !important;
  font-size: 1.075rem !important;
  border-left: solid 1px var(--text);
`;

export const MenuItem = styled.div`
  display: block;
  padding: 0;
`;

export const MenuLink = styled.span`
  height: 40.341px;
  transition: color 0.2s ease, background-color 0.2s ease;
  color: var(--text);
  border-top-right-radius: 0.475rem;
  border-bottom-right-radius: 0.475rem;
  background-color: ${({ show }) =>
    show ? "rgba(0, 0, 0, 0.02);border-bottom-right-radius:0" : "transparent"};
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
  padding: 12px;
  outline: none !important;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const MenuIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  margin-right: 0.5rem;
`;

export const MenuText = styled.span`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const SubmenuContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.02);
  flex-direction: column;
  width: 100%;
  display: flex;
  overflow: hidden;
  list-style: none;
  font-weight: 500 !important;
  font-size: 1.075rem !important;
  transition: height 0.2s ease-out;
  height: 0;
  max-width: 100%;
  border-bottom-right-radius: 0.475rem;
`;
