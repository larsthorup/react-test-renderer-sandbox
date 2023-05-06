import TestRenderer from "react-test-renderer";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

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
});
