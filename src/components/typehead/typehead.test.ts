import { renderHook, act, RenderHookResult } from "@testing-library/react"
import type { OptionUnit, TypeheadVariant } from "../../global/types"
import { useTypehead } from "./use-typehead"
import { TypeheadHookArgs, TypeheadHookReturn } from "./types"

let selectedValue: OptionUnit[] = []
let searchText = "Con"
let hookResult: RenderHookResult<TypeheadHookReturn, TypeheadHookArgs>

const setSelectedValue = (option: OptionUnit[]) => {
  selectedValue = option
}

const setSearchProps = (value: string) => {
  searchText = value
}

const optionMocks = [
  { name: "Alabama", id: 1 },
  { name: "Alaska", id: 2 },
  { name: "Arizona", id: 3 },
  { name: "Arkansas", id: 4 },
  { name: "California", id: 5 },
  { name: "Colorado", id: 6 },
  { name: "Connecticut", id: 7 },
  { name: "Delaware", id: 8 },
]

const initialProps = {
  options: optionMocks,
  variant: "single" as TypeheadVariant,
  selectedValue,
  handleSearch: (search: string) => {
    setSearchProps(search)
  },
  handleSelectedUpdate: (option: OptionUnit[]) => {
    setSelectedValue(option)
  },
}

describe("Typehead component: test updateSelectedValue, 'single' variant ", () => {
  beforeEach(() => {
    selectedValue = []
    hookResult = renderHook(useTypehead, {
      initialProps,
    })
  })

  it("should test adding selection", () => {
    hookResult.result.current.updateSelectedValue(2)
    expect(selectedValue).toEqual([{ name: "Alaska", id: 2 }])
  })

  it("should test replacing selection", () => {
    hookResult.result.current.updateSelectedValue(3)
    expect(selectedValue).toEqual([{ name: "Arizona", id: 3 }])
  })
})

describe("Typehead component: test updateSelectedValue, 'multi' variant ", () => {
  beforeEach(() => {
    selectedValue = []
    hookResult = renderHook(useTypehead, {
      initialProps: {
        ...initialProps,
        variant: "multi",
        selectedValue: [
          { name: "Colorado", id: 6 },
          { name: "Connecticut", id: 7 },
        ],
      },
    })
  })

  it("should test removing selection", () => {
    hookResult.result.current.updateSelectedValue(6)
    expect(selectedValue).toEqual([{ name: "Connecticut", id: 7 }])
  })

  it("should test multiple values update", () => {
    hookResult.result.current.updateSelectedValue(3)
    expect(selectedValue).toEqual([
      { name: "Colorado", id: 6 },
      { name: "Connecticut", id: 7 },
      { name: "Arizona", id: 3 },
    ])
  })
})

describe("Typehead component: test updateSearch", () => {
  beforeEach(() => {
    searchText = ""
    hookResult = renderHook(useTypehead, {
      initialProps,
    })
  })

  it("should update search handler", () => {
    act(() => hookResult.result.current.updateSearch("Connecticut"))
    expect(searchText).toEqual("Connecticut")
    expect(hookResult.result.current.search).toEqual("Connecticut")
  })
})
