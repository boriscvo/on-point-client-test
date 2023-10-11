import {
  render,
  screen,
  RenderHookResult,
  act,
  renderHook,
} from "@testing-library/react"
import type { InputHookArgs, InputHookReturn } from "./types"
import { Input } from "./input"
import { useInput } from "./use-input"

let searchText = ""

let hookResult: RenderHookResult<InputHookReturn, InputHookArgs>
const updateSearch = (search?: string) => {
  searchText = search || ""
}

describe("Input component: render", () => {
  it("should render component with elements", () => {
    render(
      <Input
        label={"State"}
        isFocused={true}
        value={[]}
        search={"Alas"}
        updateSearch={updateSearch}
        updateSelectedValue={() => {}}
        handleFocus={() => {}}
      />
    )

    expect(document.querySelector("input")?.value).toBe("Alas")
    expect(document.querySelector("span")?.textContent).toBe("State")
  })

  it("should render component with elements", () => {
    render(
      <Input
        label={"State"}
        isFocused={false}
        value={[{ name: "Arizona", id: 3 }]}
        search={"Alas"}
        updateSearch={updateSearch}
        updateSelectedValue={() => {}}
        handleFocus={() => {}}
      />
    )

    expect(document.querySelector("input")?.value).toBe("")
    expect(screen.getByTestId("preselected-input-value")?.textContent).toBe(
      "Arizona"
    )
  })
})

describe("Input component: useInput", () => {
  beforeEach(() => {
    searchText = ""
    hookResult = renderHook(useInput, {
      initialProps: {
        isFocused: false,
        search: searchText,
        value: [],
        updateSearch,
      } as InputHookArgs,
    })
  })

  it("should test initial hook state", () => {
    expect(hookResult.result.current.inputBoxValue).toEqual("")
    expect(hookResult.result.current.isSearchActive).toEqual(false)
    expect(hookResult.result.current.isFocusedAndSelected).toEqual(false)
    expect(hookResult.result.current.isSelected).toEqual(true)
  })

  it("should test search state", () => {
    hookResult.rerender({
      isFocused: true,
      search: "Con",
      value: [{ name: "Arizona", id: 3 }],
      updateSearch,
    })

    expect(hookResult.result.current.inputBoxValue).toEqual("Con")
    expect(hookResult.result.current.isSearchActive).toEqual(true)
    expect(hookResult.result.current.isFocusedAndSelected).toEqual(true)
    expect(hookResult.result.current.isSelected).toEqual(false)

    act(() => {
      hookResult.result.current.handleSearchClear()
    })
    expect(searchText).toEqual("")

    act(() => {
      hookResult.result.current.handleSearchChange({
        target: { value: "Ohio" },
      } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(searchText).toEqual("Ohio")
  })
})
