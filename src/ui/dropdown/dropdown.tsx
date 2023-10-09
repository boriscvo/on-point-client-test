import { OptionUnit } from "../../global/types"
import { ErrorState } from "./components/error"
import { LoadingState } from "./components/loading"
import { NoResults } from "./components/no-results"
import { Container, Option } from "./dropdown.styled"

type Props = {
  options: OptionUnit[]
  value?: OptionUnit[]
  isLoading?: boolean
  isError?: boolean
  searchStartLimit?: number
  updateValue: (id: number) => void
}

export function Dropdown({
  options,
  searchStartLimit,
  value,
  isLoading,
  isError,
  updateValue,
}: Props) {
  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState />
  }

  if (!options.length || searchStartLimit) {
    const noResultsText = searchStartLimit
      ? `Please type at least ${searchStartLimit} characters to see results...` // TODO: Add singluar/plural distinction.
      : undefined
    return <NoResults text={noResultsText} />
  }

  return (
    <Container>
      {options.map((option) => (
        <Option
          isSelected={
            !!value?.find((selectedOption) => option.id === selectedOption.id)
          } // TODO: Implement separate icon ui
          key={option.name}
          onClick={() => updateValue(option.id)}
        >
          {option.name}
        </Option>
      ))}
    </Container>
  )
}
