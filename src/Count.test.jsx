import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import Count from "./Count.jsx";

describe(Count.name, () => {
  it("should render", () => {
    const testRenderer = TestRenderer.create(<Count color="black" />);
    const html = testRenderer.toJSON();
    expect(html).toMatchInlineSnapshot(`
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
    `);
    const { root } = testRenderer;
    expect(root.type).toBe(Count);
    expect(root.props).toEqual({ color: "black" });
    const [button] = root.children;
    expect(button.type).toBe("button");
    expect(button.props).toHaveProperty("onClick");
    const [span] = button.children;
    expect(span.type).toBe("span");
    expect(span.props).toHaveProperty("style", { color: "black" });
    expect(span.children).toEqual(["count is ", "0"]);
  });

  for (let i = 0; i < 10000; ++i)
    it("should let user click to increment count", () => {
      let renderer;
      act(() => {
        // note: use "act" to wait for effect to run before clicking
        renderer = TestRenderer.create(<Count color="black" />);
      });
      const { root } = renderer;
      const [button] = root.children;

      // when: click button
      button.props.onClick();

      // then: component re-renders with incremented count
      expect(button.children[0].children).toEqual(["count is ", "1"]);
    });
});
