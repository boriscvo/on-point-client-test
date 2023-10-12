import { useCallback, useState } from "react"
import { OptionUnit, Status, TypeheadVariant } from "../../global/types.ts"
import {
  STATES_SEARCH_START,
  STATES_SEARCH_LIMIT,
} from "../../global/constants.ts"
import { HomeHookReturn } from "./types.ts"

const StatesToRenderPlaceholder = "No states selected."

export function useHome(): HomeHookReturn {
  const [typeheadVariant, setTypeheadVariant] =
    useState<TypeheadVariant>("single")
  const [statesData, setStatesData] = useState<OptionUnit[]>([])
  const [selectedState, setSelectedState] = useState<OptionUnit[]>([])
  const [status, setStatus] = useState<Status | undefined>()
  const [statesToRender, setStatesToRender] = useState<string>(
    StatesToRenderPlaceholder
  )
  const [shouldRenderStates, setShouldRenderStates] = useState<boolean>(false)

  const handleStatesToRender = useCallback(() => {
    setShouldRenderStates(true)
    if (selectedState.length) {
      const states = `Selected states are: ${selectedState
        .map((item) => item.name)
        .join(", ")}.`
      setStatesToRender(states)
    } else {
      setStatesToRender(StatesToRenderPlaceholder)
    }
  }, [selectedState])

  const updateTypeheadVariant = (variant: TypeheadVariant) => {
    setTypeheadVariant(variant)
  }

  const updateSelectedState = (state: OptionUnit[]) => {
    setSelectedState(state)
  }

  const getStates = useCallback(async (search: string) => {
    setStatus("loading")
    try {
      const response = await fetch(
        `https://bcvoro.me/names/?search=${search}&limit=${STATES_SEARCH_LIMIT}`
      )
      const jsonResponse = await response.json()
      setStatesData(jsonResponse.data)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }, [])

  const searchStates = useCallback(
    async (search: string, isFilter: boolean) => {
      if (search.length < STATES_SEARCH_START) return setStatesData([])
      if (
        isFilter &&
        statesData.length &&
        statesData.length <= STATES_SEARCH_LIMIT
      )
        return setStatesData(
          statesData.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        )

      await getStates(search)
    },
    [statesData, getStates]
  )

  return {
    statesData,
    status,
    typeheadVariant,
    searchStartFrom: STATES_SEARCH_START,
    selectedState,
    statesToRender,
    shouldRenderStates,
    getStates,
    searchStates,
    updateTypeheadVariant,
    updateSelectedState,
    handleStatesToRender,
  }
}
