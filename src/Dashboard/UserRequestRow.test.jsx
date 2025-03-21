import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserRequestRow from "./UserRequestRow";

describe("UserRequestRow", () => {
  it("renders user request row with correct information", () => {
    render(
      <UserRequestRow
        userName="Sarah Johnson"
        userEmail="sarah@example.com"
        requestType="Access Request"
        date="2 hours ago"
      />
    );

    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("sarah@example.com")).toBeInTheDocument();
    expect(screen.getByText("Access Request")).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
    expect(screen.getByText("Accept")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });
});
