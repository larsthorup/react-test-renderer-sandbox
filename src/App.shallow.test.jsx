import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";
import Count from "./Count.jsx";
import { byType } from "./shallowSearch.js";

describe(App.name, () => {
  it("should shallow render", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const root = renderer.getRenderOutput();
    expect(root).toMatchInlineSnapshot(`
      <React.Fragment>
        <h1>
          React Test Renderer sandbox
        </h1>
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
          <Count
            color="black"
          />
        </div>
      </React.Fragment>
    `);
    expect(root.type).toBe(React.Fragment);
    expect(root.props.children).toHaveLength(2);
    expect(root.props.children[0].type).toBe("h1");
    expect(root.props.children[0].props.children).toEqual(
      "React Test Renderer sandbox"
    );
    expect(root.props.children[1].type).toBe("div");
    expect(root.props.children[1].props).toHaveProperty("className", "card");
    expect(root.props.children[1].props.children).toHaveLength(2);
    expect(root.props.children[1].props.children[1].type).toBe(Count);
  });

  it("should let user change color", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    let root = renderer.getRenderOutput();
    expect(byType(Count, root).props.color).toBe("black");

    // when: change color
    byType("input", root).props.onChange({ target: { value: "red" } });

    // then: component re-renders with new color
    root = renderer.getRenderOutput();
    expect(byType(Count, root).props.color).toBe("red");
  });
});
