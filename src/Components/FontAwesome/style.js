import styled from "styled-components";

export const Container = styled.i`
  font-size: ${({ size }) => size}px;
  color: var(--${({ color }) => color});
`;
