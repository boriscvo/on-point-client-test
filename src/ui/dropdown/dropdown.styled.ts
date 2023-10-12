import { styled } from "styled-components"

export const Container = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 1;
  max-height: 280px;
  overflow-y: auto;
  background: #f2f2f2;
  border: 1px solid #000;
  border-radius: 0 0 4px 4px;
  border-top: none;
  user-select: none;
  box-sizing: border-box;
`

export const Option = styled.div<{ $isSelected: boolean }>`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  &:hover {
    background: #f0f0f0;
  }
  ${({ $isSelected }) =>
    $isSelected &&
    `
    &::after {
      content: "";
      float: right;
      transform: rotate(45deg);
      height: 8px;
      width: 4px;
      border-bottom: 3px solid #000;
      border-right: 3px solid #000;
      margin-right: 2px;
      margin-top: 3px;
    }
  `}
`

export const NoResultsText = styled.div`
  padding: 13px 10px;
  line-height: 1;
`

export const Spinner = styled.div`
  margin: 4px auto;
  text-align: center;
  border: 4px solid;
  border-top: 4px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
