import { ErrorState } from "./components/error"
import { LoadingState } from "./components/loading"
import { NoResults } from "./components/no-results"
import { Container, Option } from "./dropdown.styled"
import { DropdownProps } from "./types"
import { useDropdown } from "./use-dropdown"

export function Dropdown({
  options,
  searchStartLimit,
  value,
  status,
  updateValue,
}: DropdownProps) {
  const { isNoResults, noResultsText, getIsSelected } = useDropdown({
    options,
    searchStartLimit,
    value,
  })

  if (status === "loading") {
    return <LoadingState />
  }

  if (status === "error") {
    return <ErrorState />
  }

  if (isNoResults) {
    return <NoResults text={noResultsText} />
  }

  return (
    <Container data-testid="dropdown-ui">
      {(options || []).map((option) => (
        <Option
          $isSelected={getIsSelected(option)} // TODO: Implement separate icon ui
          key={option.name}
          onClick={() => updateValue(option.id)}
        >
          {option.name}
        </Option>
      ))}
    </Container>
  )
}
