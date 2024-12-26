import { describe, expect, it } from "vitest";
import Count from "../Count.jsx";
import { render } from "./renderer.js";

// TOOD: get rid of The current testing environment is not configured to support act(...)
// TODO: implement findByType, findByProps, findByText

describe(Count.name, () => {
  for (let i = 0; i < 10000; ++i)
    it("should render", async () => {
      const { root } = await render(<Count color="black" />);
      const [button] = root.children;
      expect(button.type).toBe("button");
      expect(button.props).toHaveProperty("onClick");
      const [span] = button.children;
      expect(span.type).toBe("span");
      expect(span.props).toHaveProperty("style", { color: "black" });
      const [text] = span.children;
      expect(text).toEqual("count is 0");
    });

  it.todo("should let user click to increment count");
});
