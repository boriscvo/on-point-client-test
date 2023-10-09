import { useState } from "react"
import { TypeheadVariant } from "../global/types.ts"
import { STATES } from "./states.ts"

export function useHome() {
  const [typeheadVariant, setTypeheadVariant] =
    useState<TypeheadVariant>("single")
  const updateTypeheadVariant = (variant: TypeheadVariant) => {
    setTypeheadVariant(variant)
  }

  return {
    options: STATES,
    typeheadVariant,
    updateTypeheadVariant,
  }
}
