import { describe, expect, it } from "vitest";
import App from "../App.jsx";
import { render } from "./renderer.js";

describe(App.name, () => {
  it("should render deeply", async () => {
    const { root } = await render(<App color="black" />);
    expect(root).toEqual({
      children: [
        {
          type: "h1",
          props: {},
          children: [
            {
              text: "React Test Renderer sandbox",
            },
          ],
        },
        {
          type: "div",
          props: {
            className: "card",
          },
          children: [
            {
              type: "label",
              props: {},
              children: [
                {
                  text: "Color:",
                },
                {
                  type: "input",
                  props: {
                    type: "text",
                    onChange: expect.any(Function),
                  },
                  children: [],
                },
              ],
            },
            {
              type: "button",
              props: {
                onClick: expect.any(Function),
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      color: "black",
                    },
                  },
                  children: [
                    {
                      text: "count is 0",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  for (let i = 0; i < 10000; ++i)
    it.todo("should let user change color", async () => {});
});
