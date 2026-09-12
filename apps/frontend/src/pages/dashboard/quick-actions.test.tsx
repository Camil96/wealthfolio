import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QuickActions } from "./quick-actions";

describe("QuickActions", () => {
  it("links to transactie toevoegen en doel aanmaken", () => {
    render(
      <MemoryRouter>
        <QuickActions />
      </MemoryRouter>,
    );

    const addTransaction = screen.getByRole("link", { name: /transactie toevoegen/i });
    const createGoal = screen.getByRole("link", { name: /doel aanmaken/i });

    expect(addTransaction).toHaveAttribute("href", "/activities/manage");
    expect(createGoal).toHaveAttribute("href", "/goals/new");
  });
});
