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
import { handler } from "../../msw/handler"
import { Home } from "./home"
import { useStates } from "./use-states"
import { HomeHookReturn } from "./types"
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
    hookResult = renderHook(useStates)
  })

  it("should return correct initial values", () => {
    expect(hookResult.result.current.statesData).toEqual(null)
    expect(hookResult.result.current.selectedState).toEqual([])
    expect(hookResult.result.current.status).toEqual(undefined)
    expect(hookResult.result.current.typeheadVariant).toEqual("single")
    expect(hookResult.result.current.searchStartFrom).toEqual(
      STATES_SEARCH_START
    )
  })
})

describe("Home page: useStates fetch", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should test getStates", async () => {
    const { result } = renderHook(useStates)

    await act(async () => {
      await result.current.getStates("ida")
    })

    expect(result.current.statesData).toEqual([
      { id: 9, name: "Florida" },
      { id: 12, name: "Idaho" },
    ])
  })
})
