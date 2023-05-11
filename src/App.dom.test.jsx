import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(App.name, () => {
  afterEach(cleanup);

  for (let i = 0; i < 10; ++i)
    it("should let user change color", async () => {
      const user = userEvent.setup();
      render(<App />);
      const button = screen.getByRole("button", { name: "count is 0" });
      const span = button.childNodes[0];
      expect(span.getAttribute("style")).toBe("color: black;");

      // when: change color
      await user.type(screen.getByLabelText("Color:"), "red");

      // then: component re-renders with new color
      expect(span.getAttribute("style")).toBe("color: red;");
    });
});
