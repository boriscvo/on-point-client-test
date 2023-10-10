import { Container, Label, InputBox, InlineClose } from "./input.styled"
import { Selected } from "./components/selected"
import { useInput } from "./use-input"
import type { InputProps } from "./types"

export function Input({
  label,
  isFocused,
  value,
  search,
  updateSearch,
  updateSelectedValue,
  handleFocus,
}: InputProps) {
  const {
    inputBoxValue,
    isSearchActive,
    isFocusedAndSelected,
    isSelected,
    inputRef,
    handleSearchClear,
    handleSearchChange,
  } = useInput({
    isFocused,
    value,
    search,
    updateSearch,
  })

  return (
    <Container>
      <InputBox
        ref={inputRef}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        value={inputBoxValue}
        type="text"
      />
      <Label isFocused={isFocusedAndSelected}>{label}</Label>
      {isSelected && <Selected value={value!} onRemove={updateSelectedValue} />}
      {isSearchActive && <InlineClose onClick={handleSearchClear} />}
    </Container>
  )
}
