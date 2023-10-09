import { useCallback, useState } from "react"
import { OptionUnit, TypeheadVariant } from "../../global/types.ts"

const STATES_SEARCH_START = 2
const STATES_SEARCH_LIMIT = 10

export function useHome() {
  const [typeheadVariant, setTypeheadVariant] =
    useState<TypeheadVariant>("single")
  const [statesData, setStatesData] = useState<OptionUnit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const updateTypeheadVariant = (variant: TypeheadVariant) => {
    setTypeheadVariant(variant)
  }

  const getStates = useCallback(async (search: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://bcvoro.me/names/?search=${search}&limit=${STATES_SEARCH_LIMIT}`
      )
      const jsonResponse = await response.json()
      setStatesData(jsonResponse.data)
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
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
    isLoading,
    isError,
    typeheadVariant,
    searchStartFrom: STATES_SEARCH_START,
    getStates,
    searchStates,
    updateTypeheadVariant,
  }
}
