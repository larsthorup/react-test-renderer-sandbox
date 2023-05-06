import TestRenderer from "react-test-renderer";
import { describe, expect, it } from "vitest";
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

  it("should let user change color", () => {
    const { root } = TestRenderer.create(<App />);
    expect(root.findByType(Count).props.color).toBe("black");

    // when: change color
    root.findByType("input").props.onChange({ target: { value: "red" } });

    // then: component re-renders with new color
    expect(root.findByType(Count).props.color).toBe("red");
  });
});
