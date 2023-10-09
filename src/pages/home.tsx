import { Typehead } from "../components/typehead/typehead"
import { Container, Title, Selection } from "./home.styled"
import { useHome } from "./use-home"

export function Home() {
  const { options, typeheadVariant, updateTypeheadVariant } = useHome()

  return (
    <Container>
      <Title>On Point SE test</Title>
      <Selection>
        <p>The active variant of typehead is:</p>
        <input
          type="radio"
          id="single"
          name="typehead_variant"
          value="single"
          checked={typeheadVariant === "single"}
          onChange={() => updateTypeheadVariant("single")}
        />
        <label htmlFor="single">Single value</label>
        <input
          type="radio"
          id="multi"
          name="typehead_variant"
          value="single"
          checked={typeheadVariant === "multi"}
          onChange={() => updateTypeheadVariant("multi")}
        />
        <label htmlFor="multi">Multiple values</label>
      </Selection>
      <Typehead options={options} variant={typeheadVariant} />
    </Container>
  )
}
