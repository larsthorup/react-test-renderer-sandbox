import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(App.name, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterEach(cleanup);

  for (let i = 0; i < 10; ++i)
    it("should let user change color", async () => {
      const user = userEvent.setup();
      render(<App />);
      let button = screen.getByRole("button", { name: "count is 0" });
      let span = button.childNodes[0];
      expect(span.getAttribute("style")).toBe("color: black;");

      // when: waiting for setTimeout to load personal color
      act(() => {
        vi.advanceTimersToNextTimer();
      });

      // then: component re-renders with new color
      expect(span.getAttribute("style")).toBe("color: green;");

      // stop faking timers, so `await user.type` below can work
      vi.useRealTimers();
      
      // when: change color
      await user.type(screen.getByLabelText("Color:"), "red");

      // then: component re-renders with new color
      expect(span.getAttribute("style")).toBe("color: red;");
    });
});
