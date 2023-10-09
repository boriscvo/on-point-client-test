import { styled } from "styled-components"

export const Container = styled.div`
  max-height: 280px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #000;
  border-radius: 0 0 4px 4px;
  border-top: none;
  user-select: none;
`

export const Option = styled.div<{ isSelected: boolean }>`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  &:hover {
    background: #f0f0f0;
  }
  ${({ isSelected }) =>
    isSelected &&
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
