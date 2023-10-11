import "@testing-library/jest-dom"
import { setupServer } from "msw/node"
import {
  render,
  screen,
  RenderHookResult,
  renderHook,
  act,
} from "@testing-library/react"
import { STATES_SEARCH_START } from "../../global/constants"
import { Home } from "./home"
import { useHome } from "./use-home"
import { HomeHookReturn } from "./types"
import { handler } from "../msw/handler"
require("isomorphic-fetch")

const server = setupServer(...handler)
let hookResult: RenderHookResult<HomeHookReturn, never>

describe("Home page: render", () => {
  it("should render Home page with elements", () => {
    render(<Home />)

    const title = document.querySelector("h4")
    const radioChoiceSingle = document.querySelector("input[id=single]")
    const radioChoiceMulti = document.querySelector("input[id=multi]")

    expect(title?.textContent).toBe("On Point SE test")
    expect(radioChoiceSingle?.getAttribute("value")).toBe("single")
    expect(radioChoiceMulti?.getAttribute("value")).toBe("multi")

    expect(screen.getByTestId("input-box")).toBeInTheDocument()
  })
})

describe("Home page: useHome", () => {
  beforeEach(() => {
    hookResult = renderHook(useHome)
  })

  it("should return correct initial values", () => {
    expect(hookResult.result.current.statesData).toEqual([])
    expect(hookResult.result.current.selectedState).toEqual([])
    expect(hookResult.result.current.status).toEqual(undefined)
    expect(hookResult.result.current.typeheadVariant).toEqual("single")
    expect(hookResult.result.current.searchStartFrom).toEqual(
      STATES_SEARCH_START
    )
  })

  it("should test searchStates", () => {
    act(() => {
      hookResult.result.current.getStates("Conn")
      hookResult.result.current.searchStates("Conn", false)
    })
  })
})

describe("Home page: useHome fetch", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should test getStates", async () => {
    const { result } = renderHook(useHome)

    await act(async () => {
      await result.current.getStates("ida")
    })

    expect(result.current.statesData).toEqual([
      { id: 9, name: "Florida" },
      { id: 12, name: "Idaho" },
    ])
  })
})
