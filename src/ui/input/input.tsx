import type { ChangeEvent } from "react"
import { OptionUnit } from "../../global/types"
import { Container, Label, InputBox } from "./input.styled"
import { Selected } from "./selected"

type Props = {
  label: string
  isFocused: boolean
  search: string
  value?: OptionUnit[]
  updateSearch: (event: ChangeEvent<HTMLInputElement>) => void
  handleFocus?: () => void
  updateSelectedValue: (id: number) => void
}

export function Input({
  label,
  isFocused,
  value,
  search,
  updateSearch,
  updateSelectedValue,
  handleFocus,
}: Props) {
  return (
    <Container>
      <InputBox
        onChange={updateSearch}
        onFocus={handleFocus}
        value={isFocused ? search : ""}
        type="text"
      />
      <Label isFocused={isFocused || !!value?.length}>{label}</Label>
      {value && !isFocused && (
        <Selected value={value} onRemove={updateSelectedValue} />
      )}
    </Container>
  )
}
