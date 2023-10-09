import { OptionUnit } from "../../global/types"
import {
  Counter,
  SelectedValueContainer,
  RenderedValue,
  InlneClose,
} from "./input.styled"

type Props = {
  value?: OptionUnit[]
  onRemove: (id: number) => void
}

const INPUT_LIMIT = 2

export function Selected({ value, onRemove }: Props) {
  if (!value?.length) {
    return <></>
  }
  return (
    <SelectedValueContainer>
      {value.map((item, i) => {
        if (i >= INPUT_LIMIT) return
        return (
          <RenderedValue key={item.name}>
            <span>{item.name}</span>
            <InlneClose onClick={() => onRemove(item.id)} />
          </RenderedValue>
        )
      })}
      {value.length > INPUT_LIMIT && (
        <Counter>+{value.length - INPUT_LIMIT} more</Counter>
      )}
    </SelectedValueContainer>
  )
}
