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
