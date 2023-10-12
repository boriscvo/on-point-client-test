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
  selectedValue,
  handleSearch,
  handleSelectedUpdate,
}: TypeheadProps) {
  const {
    isFocused,
    isDropdownActive,
    search,
    searchStartLimit,
    typeheadRef,
    updateFocusIn,
    updateFocusOut,
    updateSelectedValue,
    updateSearch,
  } = useTypehead({
    options,
    variant,
    searchStartFrom,
    selectedValue,
    handleSearch,
    handleSelectedUpdate,
  })

  return (
    <Container
      onBlur={updateFocusOut}
      tabIndex={1}
      ref={typeheadRef}
      data-testid="input-box"
    >
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
