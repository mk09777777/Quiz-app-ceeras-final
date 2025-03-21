import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuizItem from "./QuizItem";

describe("QuizItem", () => {
  it("renders quiz item with correct information", () => {
    render(
      <QuizItem
        name="Mathematics 101"
        participants="24"
        timeLeft="15 mins"
        status="Active"
      />
    );

    expect(screen.getByText("Mathematics 101")).toBeInTheDocument();
    expect(screen.getByText("24 participants")).toBeInTheDocument();
    expect(screen.getByText("15 mins left")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
