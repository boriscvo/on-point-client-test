import { STATES_SEARCH_START } from "../../../global/constants.ts"
import { OptionUnit } from "../../../global/types"
import {
  Counter,
  SelectedValueContainer,
  RenderedValue,
  InlineClose,
} from "../input.styled"

type Props = {
  value: OptionUnit[]
  onRemove: (id: number) => void
}

export function Selected({ value, onRemove }: Props) {
  return (
    <SelectedValueContainer>
      {value.map((item, i) => {
        if (i >= STATES_SEARCH_START) return
        return (
          <RenderedValue key={item.name}>
            <span>{item.name}</span>
            <InlineClose onClick={() => onRemove(item.id)} />
          </RenderedValue>
        )
      })}
      {value.length > STATES_SEARCH_START && (
        <Counter>+{value.length - STATES_SEARCH_START} more</Counter>
      )}
    </SelectedValueContainer>
  )
}
