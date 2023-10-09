import { Container, NoResultsText, Spinner } from "../dropdown.styled"

export function LoadingState() {
  return (
    <Container>
      <NoResultsText>
        <Spinner />
      </NoResultsText>
    </Container>
  )
}
