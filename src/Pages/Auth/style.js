import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Logo = styled.img`
  width: 300px;
`;

export const Form = styled.form`
  width: 500px;
  padding: 70px 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
`;

export const PasswordContent = styled.div`
  position: relative;
  width: 100%;
`;

export const LinkContent = styled.div`
  padding-top: 20px;
`;
