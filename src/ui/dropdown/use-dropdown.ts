import { useMemo, useCallback } from "react"
import { OptionUnit } from "../../global/types"

type Args = {
  options: OptionUnit[]
  value?: OptionUnit[]
  searchStartLimit?: number
}

export function useDropdown({ options, searchStartLimit, value }: Args) {
  const isNoResults = useMemo(
    () => !options.length || searchStartLimit,
    [options, searchStartLimit]
  )
  const noResultsText = useMemo(() => {
    if (searchStartLimit) {
      return `Please type at least ${searchStartLimit} characters to see results...` // TODO: Add singluar/plural distinction.
    }
  }, [searchStartLimit])

  const getIsSelected = useCallback(
    (option: OptionUnit) =>
      !!value?.find((selectedOption) => option.id === selectedOption.id),
    [value]
  )

  return {
    isNoResults,
    noResultsText,
    getIsSelected,
  }
}
