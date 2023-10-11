import {
  render,
  screen,
  RenderHookResult,
  renderHook,
} from "@testing-library/react"
import { DropdownHookArgs, DropdownHookReturn } from "./types"
import { Dropdown } from "./dropdown"
import { useDropdown } from "./use-dropdown"

let hookResult: RenderHookResult<DropdownHookReturn, DropdownHookArgs>

const initialProps = {
  options: [
    { name: "Alabama", id: 1 },
    { name: "Alaska", id: 2 },
    { name: "Arizona", id: 3 },
    { name: "Arkansas", id: 4 },
    { name: "California", id: 5 },
  ],
  value: [],
} as DropdownHookArgs

describe("Dropdown component: render", () => {
  it("should render component with elements", () => {
    render(
      <Dropdown
        options={initialProps.options}
        value={[]}
        updateValue={() => {}}
      />
    )

    expect(
      screen.getByTestId("dropdown-ui").querySelectorAll("div")[2].textContent
    ).toBe("Arizona")
  })
})

describe("Dropdown component: useDropdown", () => {
  beforeEach(() => {
    hookResult = renderHook(useDropdown, {
      initialProps,
    })
  })
  it("should return correct initial values", () => {
    expect(hookResult.result.current.isNoResults).toEqual(false)
    expect(hookResult.result.current.noResultsText).toEqual(undefined)
    expect(
      hookResult.result.current.getIsSelected(initialProps.options[0])
    ).toEqual(false)
  })

  it("should return state wiht characters limit", () => {
    hookResult.rerender({
      ...initialProps,
      searchStartLimit: 3,
    })
    expect(hookResult.result.current.isNoResults).toEqual(true)
    expect(hookResult.result.current.noResultsText).toEqual(
      "Please type at least 3 characters to see results..."
    )
  })

  it("should return selected option", () => {
    hookResult.rerender({
      ...initialProps,
      value: [{ name: "Arizona", id: 3 }],
    })
    expect(
      hookResult.result.current.getIsSelected(initialProps.options[2])
    ).toEqual(true)
  })
})
