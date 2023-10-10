import { OptionUnit, TypeheadVariant } from "../../global/types"

export type TypeheadProps = {
  options: OptionUnit[]
  variant?: TypeheadVariant
  isLoading?: boolean
  isError?: boolean
  searchStartFrom?: number
  handleSearch: (search: string, isFilter: boolean) => void
}
