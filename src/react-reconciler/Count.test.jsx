import { describe, expect, it } from "vitest";
import Count from "../Count.jsx";
import { Renderer } from "./renderer.js";
import { act } from "react";

describe(Count.name, () => {
  // for (let i = 0; i < 10000; ++i)
    it("should render", async () => {
      const { root } = await Renderer.create(<Count color="black" />);
      const [button] = root.children;
      expect(button.type).toBe("button");
      expect(button.props).toHaveProperty("onClick");
      const [span] = button.children;
      expect(span.type).toBe("span");
      expect(span.props).toHaveProperty("style", { color: "black" });
      const [text] = span.children;
      expect(text).toHaveProperty("text", "count is 0");
    });

  it("should let user click to increment count", async () => {
    const { root } = await Renderer.create(<Count color="black" />);
    const [button] = root.children;

    // when: click button
    await act(async () => {
      button.props.onClick();
    });

    // then: component re-renders with incremented count
    const [span] = button.children;
    const [text] = span.children;
    expect(text).toHaveProperty("text", "count is 1");
  });
});
