import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 97;
  box-shadow: 0px 10px 30px 0px rgb(82 63 105 / 8%);
  height: 70px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--default);
`;

export const Content = styled.div`
  padding: 0 50px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

export const LogoContainer = styled.div`
  margin-right: 1.25rem;
  align-items: center;
  display: flex;
`;

export const Logo = styled.img`
  transition: color 0.2s ease, background-color 0.2s ease;
  height: 50px;
`;

export const UserContainer = styled.div`
  align-items: center;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
`;

export const UserContent = styled.div`
  margin-left: 0.25rem;
  align-items: center;
  display: flex;
`;

export const UserButton = styled.button`
  border: 0;
  display: inline-flex;
  padding: 0.6rem 0.75rem;
  background-color: transparent;
  align-items: center;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 1.1rem;
  border-radius: 4px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const UserInfo = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;

export const UserName = styled.span`
  color: #a1a5b7;
  line-height: 1;
  font-weight: 500;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
`;

export const UserResponsibility = styled.span`
  color: #ffffff;
  line-height: 1;
  font-weight: 600;
  font-size: 0.85rem;
`;

export const LanguageContainer = styled.div`
  margin-left: 0.25rem;
  align-items: center;
  display: flex;
`;
