import TestRenderer, { act } from "react-test-renderer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import Count from "./Count.jsx";

describe(App.name, () => {
  it("should deep render", () => {
    const testRenderer = TestRenderer.create(<App />);
    const html = testRenderer.toJSON();
    expect(html).toMatchInlineSnapshot(`
      [
        <h1>
          React Test Renderer sandbox
        </h1>,
        <div
          className="card"
        >
          <label>
            Color:
            <input
              onChange={[Function]}
              type="text"
            />
          </label>
          <button
            onClick={[Function]}
          >
            <span
              style={
                {
                  "color": "black",
                }
              }
            >
              count is 
              0
            </span>
          </button>
        </div>,
      ]
    `);
  });

  describe("with mocked timers", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should wait for personalized color to load", () => {
      let renderer;
      act(() => {
        renderer = TestRenderer.create(<App />);
        // when: waiting for useEffect to run
      });
      const { root } = renderer;
      expect(root.findByType(Count).props.color).toBe("black");

      // when: waiting for setTimeout to run
      vi.advanceTimersToNextTimer();

      expect(root.findByType(Count).props.color).toBe("green");
    });
  });

  for (let i = 0; i < 10000; ++i)
    it("should let user change color", () => {
      const { root } = TestRenderer.create(<App />);
      expect(root.findByType(Count).props.color).toBe("black");

      // when: change color
      root.findByType("input").props.onChange({ target: { value: "red" } });

      // then: component re-renders with new color
      expect(root.findByType(Count).props.color).toBe("red");
    });
});
