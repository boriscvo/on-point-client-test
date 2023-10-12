import { rest } from "msw"
import * as STATES from "./states.json"

export const handler = [
  rest.get("https://bcvoro.me/names/", (req, res, ctx) => {
    return res(
      ctx.delay(Math.random() * (600 - 100) + 600), // Simulate network delay
      ctx.status(200),
      ctx.json({
        data: STATES.data
          .filter((state) =>
            state.name
              .toLowerCase()
              .includes(req.url.searchParams.get("search")?.toLowerCase() || "")
          )
          .slice(0, 10),
      })
    )
  }),
]
