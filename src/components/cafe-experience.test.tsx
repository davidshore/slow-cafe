import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { CafeExperience } from "@/components/cafe-experience";

afterEach(cleanup);

describe("CafeExperience", () => {
  it("shows the café, complete menu, and menu navigation", () => {
    render(<CafeExperience />);

    expect(screen.getByRole("heading", { name: "Slow Café" })).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Se dagens meny" }),
    ).toHaveAttribute("href", "#menu");
    expect(document.querySelector("#menu")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kanelbulle" })).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByText("6 saker att välja mellan")).toBeVisible();
    expect(screen.getByRole("button", { name: "Alla" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("filters the menu by category and shows the active category", async () => {
    const user = userEvent.setup();
    render(<CafeExperience />);

    await user.click(screen.getByRole("button", { name: "Fika" }));

    expect(screen.getByRole("button", { name: "Fika" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByText("2 saker att välja mellan")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Kanelbulle" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Citronkaka" })).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Bryggkaffe" }),
    ).not.toBeInTheDocument();
  });

  it("restores the complete menu when Alla is selected", async () => {
    const user = userEvent.setup();
    render(<CafeExperience />);

    await user.click(screen.getByRole("button", { name: "Lunch" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Grillad svampmacka" }),
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Alla" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByRole("button", { name: "Alla" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("heading", { name: "Bryggkaffe" })).toBeVisible();
  });
});
