import { OptionUnit, Status } from "../../global/types"

export type DropdownProps = {
  options: OptionUnit[] | null
  value?: OptionUnit[]
  status?: Status
  searchStartLimit?: number
  updateValue: (id: number) => void
}

export type DropdownHookArgs = {
  options: OptionUnit[] | null
  value?: OptionUnit[]
  searchStartLimit?: number
}

export type DropdownHookReturn = {
  isNoResults: boolean
  noResultsText?: string
  getIsSelected: (option: OptionUnit) => boolean
}
