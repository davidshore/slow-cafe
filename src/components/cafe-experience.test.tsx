import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { CafeExperience } from "@/components/cafe-experience";

afterEach(cleanup);

describe("CafeExperience", () => {
  it("shows the café and complete menu", () => {
    render(<CafeExperience />);

    expect(
      screen.getByRole("heading", { name: "Slow Café" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Kanelbulle" }),
    ).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("filters the menu by category", async () => {
    const user = userEvent.setup();
    render(<CafeExperience />);

    await user.click(screen.getByRole("button", { name: "Fika" }));

    expect(
      screen.getByRole("heading", { name: "Kanelbulle" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Citronkaka" })).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Bryggkaffe" }),
    ).not.toBeInTheDocument();
  });
});

