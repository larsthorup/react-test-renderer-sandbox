import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
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
          <button
            onClick={[Function]}
          >
            count is 
            0
          </button>
        </div>,
      ]
    `);
  });

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
          <Count />
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
    expect(root.props.children[1].props.children.type).toBe(Count);
  });
});
