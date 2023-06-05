import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import Count from "./Count.jsx";

describe(Count.name, () => {
  it("should render", () => {
    const { toJSON, root } = TestRenderer.create(<Count color="black" />);
    expect(toJSON()).toMatchInlineSnapshot(`
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
          count is 0
        </span>
      </button>
    `);
    expect(root.type).toBe(Count);
    expect(root.props).toEqual({ color: "black" });
    const button = root.findByType("button");
    expect(button.props).toHaveProperty("onClick");
    const span = button.props.children;
    expect(span.type).toBe("span");
    expect(span.props).toHaveProperty("style", { color: "black" });
    expect(span.props.children).toEqual("count is 0");
  });

  it("should let user click to increment count", () => {
    let renderer;
    act(() => {
      // note: use "act" to wait for effect to run before clicking
      renderer = TestRenderer.create(<Count color="black" />);
    });
    const { root } = renderer;
    const button = root.findByType("button");

    // when: click button
    button.props.onClick();

    // then: component re-renders with incremented count
    expect(button.props.children.props.children).toEqual("count is 1");
  });
});
