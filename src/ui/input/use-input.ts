import { useCallback, useMemo, ChangeEvent, createRef } from "react"
import type { InputProps } from "./types"

export function useInput({
  isFocused,
  value,
  search,
  updateSearch,
}: Omit<InputProps, "label" | "updateSelectedValue" | "handleFocus">) {
  const inputRef = createRef<HTMLInputElement>()

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      return updateSearch(event.target.value)
    },
    [updateSearch]
  )

  const handleSearchClear = useCallback(() => {
    updateSearch("")
    inputRef.current?.focus()
  }, [inputRef, updateSearch])

  const inputBoxValue = useMemo(() => {
    return isFocused ? search : ""
  }, [isFocused, search])

  const isSearchActive = useMemo(() => {
    return !!(isFocused && search)
  }, [isFocused, search])

  const isFocusedAndSelected = useMemo(() => {
    return isFocused || !!value?.length
  }, [isFocused, value])

  const isSelected = useMemo(() => {
    return !!(!isFocused && value)
  }, [isFocused, value])

  return {
    inputBoxValue,
    isSearchActive,
    isFocusedAndSelected,
    isSelected,
    inputRef,
    handleSearchClear,
    handleSearchChange,
  }
}
