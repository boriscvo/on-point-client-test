import { OptionUnit, Status, TypeheadVariant } from "../../global/types.ts"

export type HomeHookReturn = {
  statesData: OptionUnit[]
  status?: Status
  typeheadVariant: TypeheadVariant
  searchStartFrom: number
  selectedState: OptionUnit[]
  getStates: (search: string) => Promise<void>
  searchStates: (search: string, isFilter: boolean) => Promise<void>
  updateTypeheadVariant: (variant: TypeheadVariant) => void
  updateSelectedState: (state: OptionUnit[]) => void
}