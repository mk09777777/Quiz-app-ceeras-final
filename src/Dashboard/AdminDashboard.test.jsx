import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "./AdminDashboard";

describe("AdminDashboard", () => {
  it("renders the admin dashboard with correct title", () => {
    render(<AdminDashboard />);
    expect(screen.getByText("John Admin")).toBeInTheDocument();
  });

  it("renders all four stat cards", () => {
    render(<AdminDashboard />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Active Quizzes")).toBeInTheDocument();
    expect(screen.getByText("Completed Quizzes")).toBeInTheDocument();
    expect(screen.getByText("Pending Requests")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<AdminDashboard />);
    expect(screen.getByText("Create New Quiz")).toBeInTheDocument();
    expect(screen.getByText("Manage Users")).toBeInTheDocument();
    expect(screen.getByText("View All Quizzes")).toBeInTheDocument();
  });

  it("renders the competition rates section", () => {
    render(<AdminDashboard />);
    expect(screen.getByText("Quiz Competition Rates")).toBeInTheDocument();
    expect(screen.getByAltText("Competition rates chart")).toBeInTheDocument();
  });

  it("renders the live quizzes section", () => {
    render(<AdminDashboard />);
    expect(screen.getByText("Live Quizzes")).toBeInTheDocument();
    expect(screen.getByText("4 active now")).toBeInTheDocument();
    expect(screen.getByText("Mathematics 101")).toBeInTheDocument();
    expect(screen.getByText("History Quiz")).toBeInTheDocument();
  });

  it("renders the user requests section", () => {
    render(<AdminDashboard />);
    expect(screen.getByText("Recent User Requests")).toBeInTheDocument();
    expect(screen.getByText("Shiva Johnson")).toBeInTheDocument();
    expect(screen.getByText("Michael Chen")).toBeInTheDocument();
  });
});
