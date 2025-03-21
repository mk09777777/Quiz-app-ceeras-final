import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders with positive change", () => {
    render(
      <StatCard
        label="Total Users"
        value="2,543"
        changePercentage="12"
        isPositive={true}
      />
    );

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("2,543")).toBeInTheDocument();
    expect(screen.getByText("12% vs last month")).toBeInTheDocument();
  });

  it("renders with negative change", () => {
    render(
      <StatCard
        label="Pending Requests"
        value="42"
        changePercentage="5"
        isPositive={false}
      />
    );

    expect(screen.getByText("Pending Requests")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("5% vs last month")).toBeInTheDocument();
  });
});
