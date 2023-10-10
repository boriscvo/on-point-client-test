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
