import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";
import { Renderer } from "./renderer.js";
import { act } from "react";

describe(App.name, () => {
  it("should render deeply", async () => {
    const renderer = await Renderer.create(<App />);
    expect(renderer.root).toEqual({
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

    // get by type
    expect(renderer.findByType("span").props.style.color).toBe("black");

    // get by props
    expect(renderer.findByProps({ style: { color: "black" } }).type).toBe(
      "span"
    );

    // get by text
    expect(renderer.findByText("count is 0")).toBeDefined();

    // get by predicate
    expect(
      renderer.find(
        (el) =>
          el.type === "span" &&
          el.props.style.color === "black" &&
          el.children.find(({ text }) => text === "count is 0")
      )
    ).toBeDefined();
  });

  describe("with mocked timers", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    for (let i = 0; i < 10000; ++i)
      it("should change color", async () => {
        const renderer = await Renderer.create(<App />);
        expect(renderer.findByType("span").props.style.color).toBe("black");

        // when: waiting for setTimeout to load personal color
        await act(async () => {
          vi.advanceTimersToNextTimer();
        });

        // then: component re-renders with new color
        expect(renderer.findByType("span").props.style.color).toBe("green");

        // when: user changes color
        await act(async () => {
          renderer
            .findByType("input")
            .props.onChange({ target: { value: "red" } });
        });

        // then: component re-renders with new color
        expect(renderer.findByType("span").props.style.color).toBe("red");
      });
  });
});
