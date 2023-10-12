import { OptionUnit, Status, TypeheadVariant } from "../../global/types.ts"

export type HomeHookReturn = {
  statesData: OptionUnit[] | null
  status?: Status
  typeheadVariant: TypeheadVariant
  searchStartFrom: number
  selectedState: OptionUnit[]
  statesToRender: string
  shouldRenderStates: boolean
  getStates: (search: string) => Promise<void>
  searchStates: (search: string) => void
  updateTypeheadVariant: (variant: TypeheadVariant) => void
  updateSelectedState: (state: OptionUnit[]) => void
  handleStatesToRender: () => void
}
