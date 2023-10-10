import { useState, useMemo } from "react"
import type { FocusEvent } from "react"
import { OptionUnit } from "../../global/types"
import { TypeheadProps } from "./types"

export function useTypehead({
  options,
  variant = "single",
  searchStartFrom,
  handleSearch,
}: Omit<TypeheadProps, "isloading" | "isError" | "label">) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [selectedValue, setSelectedValue] = useState<OptionUnit[]>([])
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false)

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
    if (event.relatedTarget) {
      return
    }
    dropTypeheadState()
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

    if (variant === "single") {
      dropTypeheadState()
    }

    setSelectedValue(optionToUpdate)
  }

  const updateRemovedValue = (id: number) => {
    setSelectedValue(selectedValue.filter((option) => option.id !== id))
  }

  const updateSearch = (value: string = "") => {
    setSearch(value)
    handleSearch(value, value.length > search.length)
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
