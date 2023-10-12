import { Typehead } from "../../components/typehead/typehead"
import { Container, Title, Selection, Button } from "./home.styled"
import { useHome } from "./use-home"

export function Home() {
  const {
    statesData,
    typeheadVariant,
    status,
    searchStartFrom,
    selectedState,
    statesToRender,
    shouldRenderStates,
    updateTypeheadVariant,
    updateSelectedState,
    searchStates,
    handleStatesToRender,
  } = useHome()

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
          value="multi"
          checked={typeheadVariant === "multi"}
          onChange={() => updateTypeheadVariant("multi")}
        />
        <label htmlFor="multi">Multiple values</label>
      </Selection>
      <Typehead
        label="States"
        options={statesData}
        variant={typeheadVariant}
        status={status}
        selectedValue={selectedState}
        searchStartFrom={searchStartFrom}
        handleSearch={searchStates}
        handleSelectedUpdate={updateSelectedState}
      />
      <Button onClick={handleStatesToRender}>Submit</Button>
      {shouldRenderStates && <div>{statesToRender}</div>}
    </Container>
  )
}
