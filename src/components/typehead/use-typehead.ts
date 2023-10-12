import { useState, useMemo, createRef, useCallback } from "react"
import type { FocusEvent } from "react"
import { TypeheadHookArgs, TypeheadHookReturn } from "./types"

export function useTypehead({
  options,
  variant = "single",
  searchStartFrom,
  selectedValue,
  handleSearch,
  handleSelectedUpdate,
}: TypeheadHookArgs): TypeheadHookReturn {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false)
  const typeheadRef = createRef<HTMLDivElement>()

  const dropTypeheadState = () => {
    setIsDropdownActive(false)
    setIsFocused(false)
  }

  const searchStartLimit = useMemo(() => {
    if (!searchStartFrom) {
      return 0
    }
    return search.length < searchStartFrom ? searchStartFrom : 0
  }, [searchStartFrom, search])

  const updateFocusIn = () => {
    setIsFocused(true)
    setIsDropdownActive(true)
  }

  const updateFocusOut = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget === typeheadRef.current) {
      return
    }
    dropTypeheadState()
  }

  const updateSelectedValue = useCallback(
    (id: number) => {
      const optionToRemove = selectedValue.find((option) => option.id === id)
      if (optionToRemove) {
        handleSelectedUpdate(selectedValue.filter((option) => option.id !== id))
        return
      }

      const selectedOption = options.find((option) => option.id === id)
      if (!selectedOption) return

      const optionToUpdate =
        variant === "single"
          ? [selectedOption]
          : [...selectedValue, selectedOption]

      if (variant === "single") {
        dropTypeheadState()
      }

      handleSelectedUpdate(optionToUpdate)
    },
    [handleSelectedUpdate, options, selectedValue, variant]
  )

  const updateSearch = useCallback(
    (value: string = "") => {
      setSearch(value)
      handleSearch(value)
    },
    [handleSearch]
  )

  return {
    options,
    isFocused,
    isDropdownActive,
    selectedValue,
    search,
    searchStartLimit,
    typeheadRef,
    updateFocusIn,
    updateFocusOut,
    updateSelectedValue,
    updateSearch,
  }
}
