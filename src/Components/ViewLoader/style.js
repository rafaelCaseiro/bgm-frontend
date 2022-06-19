import styled from "styled-components";
import ReactLoading from "react-loading";

export const Container = styled.div`
  width: 100%;
  transition: all 0.5s linear;
  opacity: ${({ isLoading }) => (isLoading ? "1" : "0")};
`;

export const Img = styled.div`
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const Spin = styled(ReactLoading)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;
