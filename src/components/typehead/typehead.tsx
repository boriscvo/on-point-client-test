import { Dropdown } from "../../ui/dropdown/dropdown"
import { Input } from "../../ui/input/input"
import { Container } from "./typehead.styled"

export function Typehead() {
  return (
    <Container>
      <Input />
      <Dropdown />
    </Container>
  )
}
