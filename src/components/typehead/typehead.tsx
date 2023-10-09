import { OptionUnit, TypeheadVariant } from "../../global/types"
import { Dropdown } from "../../ui/dropdown/dropdown"
import { Input } from "../../ui/input/input"
import { Container } from "./typehead.styled"
import { useTypehead } from "./use-typehead"

type Props = {
  options: OptionUnit[]
  variant?: TypeheadVariant
  isLoading?: boolean
  isError?: boolean
  searchStartFrom?: number
  handleSearch: (search: string, isFilter: boolean) => void
}

export function Typehead({
  options,
  variant = "single",
  isLoading,
  isError,
  searchStartFrom,
  handleSearch,
}: Props) {
  const {
    isFocused,
    isDropdownActive,
    selectedValue,
    search,
    searchStartLimit,
    updateFocusIn,
    updateFocusOut,
    updateSelectedValue,
    updateSearch,
  } = useTypehead({
    options,
    variant,
    searchStartFrom,
    handleSearch,
  })

  return (
    <Container onBlur={updateFocusOut} tabIndex={1}>
      <Input
        label="States"
        search={search}
        value={selectedValue}
        isFocused={isFocused}
        updateSearch={updateSearch}
        updateSelectedValue={updateSelectedValue}
        handleFocus={updateFocusIn}
      />
      {isDropdownActive && (
        <Dropdown
          options={options}
          value={selectedValue}
          isLoading={isLoading}
          isError={isError}
          searchStartLimit={searchStartLimit}
          updateValue={updateSelectedValue}
        />
      )}
    </Container>
  )
}
