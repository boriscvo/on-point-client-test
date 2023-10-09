import { Container, NoResultsText } from "../dropdown.styled"

export function ErrorState() {
  return (
    <Container>
      <NoResultsText>
        Oops, something went wrong. Please try again later...
      </NoResultsText>
    </Container>
  )
}
