import styled from "styled-components";

export const BoxSelector = styled.div`
  border: 1px rgba(0, 0, 0, 0.12) solid;
  width: 100%;
  border-radius: 4px;
  box-shadow: inset 0px 0px 9px 0px rgb(0 0 0 / 18%);
  height: 100%;
  padding: 10px;
`;

export const BoxContentItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const BoxItem = styled.div`
  border-radius: 4px;
  padding: 5px 10px;
  border: 1px solid #dcdcdc;
  margin-bottom: 5px;
  margin-right: 10px;
  box-shadow: 1px 1px 1px 0 rgb(0 0 0 / 50%);
  cursor: pointer;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s;
  &:hover {
    box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 50%);
  }
`;

export const InputContent = styled.div``;

export const SaveForm = styled.form`
  display: flex;
  gap: 10px;
  margin-right: 10px;
`;
