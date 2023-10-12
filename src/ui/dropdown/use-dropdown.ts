import { useMemo, useCallback } from "react"
import { OptionUnit } from "../../global/types"
import { DropdownHookArgs, DropdownHookReturn } from "./types"

export function useDropdown({
  options,
  searchStartLimit,
  value,
}: DropdownHookArgs): DropdownHookReturn {
  const isNoResults = useMemo(
    () => !!(!options?.length || searchStartLimit),
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
