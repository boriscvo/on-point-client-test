import { useState, useMemo } from "react"
import type { ChangeEvent, FocusEvent } from "react"
import { OptionUnit, TypeheadVariant } from "../../global/types"

type Args = {
  options: OptionUnit[]
  variant?: TypeheadVariant
  searchStartFrom?: number
  handleSearch: (search: string, isFilter: boolean) => void
}

export function useTypehead({
  options,
  variant = "single",
  searchStartFrom,
  handleSearch,
}: Args) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [selectedValue, setSelectedValue] = useState<OptionUnit[]>([])
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false)

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
    if (event.relatedTarget) {
      return
    }
    setIsDropdownActive(false)
    setIsFocused(false)
  }

  const updateSelectedValue = (id: number) => {
    const optionToRemove = selectedValue.find((option) => option.id === id)
    if (optionToRemove) {
      setSelectedValue(selectedValue.filter((option) => option.id !== id))
      return
    }

    const selectedOption = options.find((option) => option.id === id)
    if (!selectedOption) return

    const optionToUpdate =
      variant === "single"
        ? [selectedOption]
        : [...selectedValue, selectedOption]

    setSelectedValue(optionToUpdate)
  }

  const updateRemovedValue = (id: number) => {
    setSelectedValue(selectedValue.filter((option) => option.id !== id))
  }

  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value || ""
    setSearch(key)
    handleSearch(key, key.length > search.length)
  }

  return {
    options,
    isFocused,
    isDropdownActive,
    selectedValue,
    search,
    searchStartLimit,
    updateRemovedValue,
    updateFocusIn,
    updateFocusOut,
    updateSelectedValue,
    updateSearch,
  }
}
