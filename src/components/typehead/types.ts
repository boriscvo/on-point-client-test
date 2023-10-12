import type { FocusEvent } from "react"
import { OptionUnit, Status, TypeheadVariant } from "../../global/types"

export type TypeheadProps = {
  label: string
  options: OptionUnit[] | null
  selectedValue: OptionUnit[]
  variant?: TypeheadVariant
  status?: Status
  searchStartFrom?: number
  handleSearch: (search: string) => void
  handleSelectedUpdate: (selected: OptionUnit[]) => void
}

export type TypeheadHookArgs = Omit<TypeheadProps, "label" | "status">

export type TypeheadHookReturn = {
  options: OptionUnit[] | null
  isFocused: boolean
  isDropdownActive: boolean
  selectedValue: OptionUnit[]
  search: string
  searchStartLimit?: number
  typeheadRef: React.RefObject<HTMLDivElement>
  updateFocusIn: () => void
  updateFocusOut: (event: FocusEvent<HTMLInputElement>) => void
  updateSelectedValue: (id: number) => void
  updateSearch: (search?: string) => void
}
