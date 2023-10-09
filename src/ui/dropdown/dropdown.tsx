import { OptionUnit } from "../../global/types"
import { Container, Option } from "./dropdown.styled"

type Props = {
  options: OptionUnit[]
  value?: OptionUnit[]
  updateValue: (id: number) => void
}

export function Dropdown({ options, value, updateValue }: Props) {
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
