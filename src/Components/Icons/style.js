import styled from "styled-components";

export const Svg = styled.svg`
  ${({ onClick }) => (onClick ? "cursor:pointer" : "")};
  path {
    transition: all 0.5s;
    fill: ${({ color }) => color};

    :hover {
      fill: ${({ colorHover, color }) => colorHover || color};
    }
  }
`;
