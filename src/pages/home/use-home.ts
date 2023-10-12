import { useCallback, useState, useEffect } from "react"
import { OptionUnit, Status, TypeheadVariant } from "../../global/types.ts" //TODO add global as alias
import {
  STATES_SEARCH_START,
  STATES_SEARCH_LIMIT,
} from "../../global/constants.ts"
import { HomeHookReturn } from "./types.ts"

const StatesToRenderPlaceholder = "No states selected."

export function useHome(): HomeHookReturn {
  const [typeheadVariant, setTypeheadVariant] =
    useState<TypeheadVariant>("single")
  const [statesData, setStatesData] = useState<OptionUnit[] | null>(null)
  const [selectedState, setSelectedState] = useState<OptionUnit[]>([])
  const [status, setStatus] = useState<Status | undefined>()
  const [statesSearch, setStatesSearch] = useState<string>("")
  const [previousStatesSearch, setPreviousStatesSearch] = useState<string>("")
  const [statesToRender, setStatesToRender] = useState<string>(
    StatesToRenderPlaceholder
  )
  const [shouldRenderStates, setShouldRenderStates] = useState<boolean>(false)

  const getSearchOrFilter = useCallback(
    (search: string, prev: string) => {
      const searchCondition =
        search.length >= STATES_SEARCH_START && !statesData
      const filterCondition =
        search.length > previousStatesSearch.length &&
        statesData &&
        statesData?.length < STATES_SEARCH_LIMIT &&
        search.toLowerCase().includes(prev.toLowerCase())

      if (search.length < STATES_SEARCH_START) {
        return "not-started"
      }

      if (searchCondition) {
        return "search"
      }

      if (filterCondition) {
        return "filter"
      }

      return "search"
    },
    [previousStatesSearch, statesData]
  )

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
    (search: string) => {
      setStatesSearch(search)
    },
    [setStatesSearch]
  )

  const setStatesDebouncer = useCallback(
    async (search: string) => {
      const searchMode = getSearchOrFilter(search, previousStatesSearch)

      if (searchMode === "not-started") {
        setStatus("success")
        return setStatesData(null)
      }

      if (searchMode === "filter") {
        setStatus("success")
        return setStatesData(
          statesData?.filter((item) =>
            item.name.toLowerCase().includes(statesSearch.toLowerCase())
          ) || []
        )
      }
      await getStates(statesSearch)
    },
    [
      statesData,
      previousStatesSearch,
      getStates,
      getSearchOrFilter,
      statesSearch,
    ]
  )

  useEffect(() => {
    if (statesSearch && !statesData) {
      setStatus("loading")
    }
    const timeout = setTimeout(() => {
      setPreviousStatesSearch(statesSearch)
      setStatesDebouncer(statesSearch)
    }, 200)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statesSearch])

  return {
    statesData: statesData || [],
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
