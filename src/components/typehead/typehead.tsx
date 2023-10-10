import { Dropdown } from "../../ui/dropdown/dropdown"
import { Input } from "../../ui/input/input"
import { Container } from "./typehead.styled"
import { TypeheadProps } from "./types"
import { useTypehead } from "./use-typehead"

export function Typehead({
  label,
  options,
  variant = "single",
  status,
  searchStartFrom,
  handleSearch,
}: TypeheadProps) {
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
        label={label}
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
          status={status}
          searchStartLimit={searchStartLimit}
          updateValue={updateSelectedValue}
        />
      )}
    </Container>
  )
}
