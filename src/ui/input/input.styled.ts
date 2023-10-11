import styled, { css } from "styled-components"

const PADDING = {
  vertical: 10,
  horizontal: 10,
}

export const Container = styled.div`
  position: relative;
  background: #fff;
`

export const InputBox = styled.input`
  position: relative;
  width: 100%;
  padding: ${PADDING.vertical}px ${PADDING.horizontal}px;
  border: 2px solid #000;
  border-radius: 4px;
  background: transparent;
  box-sizing: border-box;
  z-index: 1;
`

export const Label = styled.span<{ $isFocused: boolean }>`
  position: absolute;
  top: ${PADDING.vertical}px;
  left: ${PADDING.horizontal}px;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  user-select: none;
  transition: all 0.2s ease-in-out;
  ${({ $isFocused }) =>
    $isFocused &&
    css`
      z-index: 1;
      font-size: 0.9rem;
      top: 0;
      left: 6px;
      transform: translateY(-50%);
      background: #fff;
      padding: 0 2px;
    `}
`

export const SelectedValueContainer = styled.div`
  position: absolute;
  display: flex;
  top: ${PADDING.vertical}px;
  left: ${PADDING.horizontal}px;
  white-space: nowrap;
`

export const RenderedValue = styled.div`
  position: relative;
  padding: 2px 25px 2px 4px;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  line-height: 1rem;
  user-select: none;
  z-index: 1;
  &:only-child {
    max-width: 250px;
  }
`

export const Counter = styled.span`
  position: relative;
  border-radius: 4px;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 1px 4px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  line-height: 1rem;
  user-select: none;
`

export const InlineClose = styled.div`
  position: absolute;
  display: flex;
  width: 20px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  background: transparent;
  border-radius: 4px;
  top: 0px;
  right: 0px;
  cursor: pointer;
  text-align: center;
  z-index: 1;
  &:after {
    content: "\\d7";
    font-size: 1.4rem;
    width: 100%;
    align-self: center;
    margin-top: 1px;
  }
`
