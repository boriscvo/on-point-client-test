import { ChangeEvent } from "react"
import { OptionUnit } from "../../global/types"

export type InputProps = {
  label: string
  isFocused: boolean
  search: string
  value?: OptionUnit[]
  updateSearch: (value?: string) => void
  handleFocus?: () => void
  updateSelectedValue: (id: number) => void
}

export type InputHookArgs = Omit<
  InputProps,
  "label" | "handleFocus" | "updateSelectedValue"
>

export type InputHookReturn = {
  inputBoxValue: string
  isSearchActive: boolean
  isFocusedAndSelected: boolean
  isSelected: boolean
  inputRef: React.RefObject<HTMLInputElement>
  handleSearchClear: () => void
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}
