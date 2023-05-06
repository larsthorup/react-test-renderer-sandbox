import TestRenderer from "react-test-renderer";
import { describe, expect, it } from "vitest";
import Count from "./Count.jsx";

describe("Count", () => {
  it("should render", () => {
    const testRenderer = TestRenderer.create(<Count />);
    const html = testRenderer.toJSON();
    expect(html).toMatchInlineSnapshot(`
<button
  onClick={[Function]}
>
  count is 
  0
</button>`);
    const { root } = testRenderer;
    expect(root.type).toBe(Count);
    expect(root.props).toEqual({});
    const [button] = root.children;
    expect(button.type).toBe("button");
    expect(button.props).toHaveProperty("onClick");
    expect(button.children).toEqual(["count is ", "0"]);
  });

  it("should let user click to increment count", () => {
    const { root } = TestRenderer.create(<Count />);
    const [button] = root.children;

    // when: click button
    button.props.onClick();

    // then: component re-renders with incremented count
    expect(button.children).toEqual(["count is ", "1"]);
  });
});
