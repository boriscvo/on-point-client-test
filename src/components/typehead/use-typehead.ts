import { useState, useRef } from "react"
import type { ChangeEvent, FocusEvent } from "react"
import { OptionUnit, TypeheadVariant } from "../../global/types"

type Args = {
  options: OptionUnit[]
  variant?: TypeheadVariant
}

export function useTypehead({ options, variant }: Args) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [selectedValue, setSelectedValue] = useState<OptionUnit[]>([])
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateFocusIn = () => {
    setIsFocused(true)
    setIsDropdownActive(true)
  }

  const updateFocusOut = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      return
    }
    setSearch("")
    setIsDropdownActive(false)
    setIsFocused(false)
  }

  const updateSelectedValue = (id: number) => {
    const selectedOption = options.find((option) => option.id === id)
    if (!selectedOption) return

    const optionToRemove = selectedValue.find((option) => option.id === id)
    if (optionToRemove) {
      setSelectedValue(selectedValue.filter((option) => option.id !== id))
      return
    }

    const optionToUpdate =
      variant === "single"
        ? [selectedOption]
        : [...selectedValue, selectedOption]

    setSelectedValue(optionToUpdate)
  }

  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value || "")
  }

  return {
    options,
    isFocused,
    isDropdownActive,
    selectedValue,
    search,
    containerRef,
    updateFocusIn,
    updateFocusOut,
    updateSelectedValue,
    updateSearch,
  }
}
