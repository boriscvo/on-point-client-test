import type { FocusEvent } from "react"
import { OptionUnit, Status, TypeheadVariant } from "../../global/types"

export type TypeheadProps = {
  label: string
  options: OptionUnit[]
  selectedValue: OptionUnit[]
  variant?: TypeheadVariant
  status?: Status
  searchStartFrom?: number
  handleSearch: (search: string, isFilter: boolean) => void
  handleSelectedUpdate: (selected: OptionUnit[]) => void
}

export type TypeheadHookArgs = Omit<TypeheadProps, "label" | "status">

export type TypeheadHookReturn = {
  options: OptionUnit[]
  isFocused: boolean
  isDropdownActive: boolean
  selectedValue: OptionUnit[]
  search: string
  searchStartLimit?: number
  updateFocusIn: () => void
  updateFocusOut: (event: FocusEvent<HTMLInputElement>) => void
  updateSelectedValue: (id: number) => void
  updateSearch: (search?: string) => void
}
