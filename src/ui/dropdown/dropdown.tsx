import { OptionUnit, Status } from "../../global/types"
import { ErrorState } from "./components/error"
import { LoadingState } from "./components/loading"
import { NoResults } from "./components/no-results"
import { Container, Option } from "./dropdown.styled"
import { useDropdown } from "./use-dropdown"

type Props = {
  options: OptionUnit[]
  value?: OptionUnit[]
  status?: Status
  searchStartLimit?: number
  updateValue: (id: number) => void
}

export function Dropdown({
  options,
  searchStartLimit,
  value,
  status,
  updateValue,
}: Props) {
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
    <Container>
      {options.map((option) => (
        <Option
          isSelected={getIsSelected(option)} // TODO: Implement separate icon ui
          key={option.name}
          onClick={() => updateValue(option.id)}
        >
          {option.name}
        </Option>
      ))}
    </Container>
  )
}
