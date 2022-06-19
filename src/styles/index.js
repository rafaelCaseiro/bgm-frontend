import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  margin-left: -10px;
  margin-right: -10px;

  @media (max-width: 1200px) {
    margin: 0;
    flex-direction: column;
  }
`;

export const Col = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ flexRow }) => (flexRow ? "row" : "column")};
  ${({ flexRow }) => (flexRow ? "align-items:center;" : "")}
  margin-bottom: 20px;
  @media (min-width: 1200px) {
    flex: ${({ size }) => size || 1};
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
  }

  @media (max-width: 1200px) {
    margin-bottom: 10px;
  }
`;

export const Separator = styled.div`
  border-bottom: 1px dashed #ebedf3;
  height: 0;

  margin-bottom: 1.25rem !important;
`;

export const Block = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  box-shadow: 0px 0px 20px 0px rgb(76 87 125 / 2%);
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 0.3rem;
`;

const blockHeaderBackgroundCss = css`
  background-image: url("${({ bg }) => bg}");
  background-position: bottom;
  background-attachment: fixed;
  background-size: 100%;
  color: #fff;
  height: 150px;
  align-items: flex-start;
  padding-top: 20px;
  margin-bottom: -90px;
`;

export const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 25px;
  border-bottom: 1px solid #ebedf2;
  min-height: 60px;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #48465b;
  ${({ bg }) => (bg ? blockHeaderBackgroundCss : "")}
  span {
    display: flex;
    align-items: center;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      :not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`;

export const BlockBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  border-radius: 0.3rem;
  z-index: 0;
`;

export const BlockBodyContent = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
  margin: 0.3rem;
  transition: all 0.3s ease;
  box-shadow: -1px 1px 7px rgb(0 0 0 / 20%);
`;

export const Card = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border: solid 1px #ebedf2;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 20px 0px rgb(76 87 125 / 2%);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px 25px;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  border-bottom: 1px solid #ebedf2;
  background-color: #f7f8fa;
  font-weight: 500;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

export const Group = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  button,
  a,
  input,
  select {
    position: relative;
    flex: 1 1 auto;
    :first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    :not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export const SpanLink = styled.span`
  cursor: pointer;
  :hover {
    color: var(--default) !important;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
