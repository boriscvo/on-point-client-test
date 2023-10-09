import { Container, NoResultsText } from "../dropdown.styled"

type Props = {
  text?: string
}

export function NoResults({ text }: Props) {
  const defaultText =
    "No results. Please try to change your search preferences..."
  return (
    <Container>
      <NoResultsText>{text || defaultText}</NoResultsText>
    </Container>
  )
}
