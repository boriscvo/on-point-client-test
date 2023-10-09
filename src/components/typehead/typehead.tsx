import { OptionUnit, TypeheadVariant } from "../../global/types"
import { Dropdown } from "../../ui/dropdown/dropdown"
import { Input } from "../../ui/input/input"
import { Container } from "./typehead.styled"
import { useTypehead } from "./use-typehead"

type Props = {
  options: OptionUnit[]
  variant?: TypeheadVariant
}

export function Typehead({ options, variant = "single" }: Props) {
  const {
    isFocused,
    isDropdownActive,
    selectedValue,
    search,
    containerRef,
    updateFocusIn,
    updateFocusOut,
    updateSelectedValue,
    updateSearch,
  } = useTypehead({
    options,
    variant,
  })

  return (
    <Container ref={containerRef} onBlur={updateFocusOut} tabIndex={1}>
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
          updateValue={updateSelectedValue}
        />
      )}
    </Container>
  )
}
