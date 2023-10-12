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

const MAX_SHOWN = 2

export function Selected({ value, onRemove }: Props) {
  return (
    <SelectedValueContainer>
      {value.map((item, i) => {
        if (i >= MAX_SHOWN) return
        return (
          <RenderedValue key={item.name}>
            <span data-testid="preselected-input-value">{item.name}</span>
            <InlineClose onClick={() => onRemove(item.id)} />
          </RenderedValue>
        )
      })}
      {value.length > MAX_SHOWN && (
        <Counter>+{value.length - MAX_SHOWN} more</Counter>
      )}
    </SelectedValueContainer>
  )
}
