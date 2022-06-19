import styled from "styled-components";

export const Container = styled.div`
  color: ${({ color }) => color};
  background: ${({ bg }) => bg};
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
  padding: 0;
  margin: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
