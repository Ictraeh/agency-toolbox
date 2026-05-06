import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

afterEach(() => {
  cleanup();
});

vi.mock("framer-motion", async () => {
  const ReactModule = await import("react");
  const motionPropsToStrip = new Set([
    "variants",
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "viewport"
  ]);

  const MotionStub = new Proxy(
    {},
    {
      get: (_, tagName: string) => {
        return ({
          children,
          ...props
        }: {
          children?: React.ReactNode;
          [key: string]: unknown;
        }) => {
          const domProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !motionPropsToStrip.has(key))
          );

          return ReactModule.createElement(tagName, domProps, children);
        };
      }
    }
  );

  return {
    motion: MotionStub,
    useReducedMotion: () => true
  };
});

describe("Landing page", () => {
  it("renders hero content, search bar, and tool cards", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Tiny tools for massive workflows."
      })
    ).toBeInTheDocument();

    expect(screen.getByText("ChopShop")).toBeInTheDocument();
    expect(screen.getByText("SlimFont")).toBeInTheDocument();
    expect(screen.getByText("TagTeam")).toBeInTheDocument();
    expect(screen.getByText("SafeSpace")).toBeInTheDocument();
    expect(screen.getByText("UIColorGenerator")).toBeInTheDocument();
    expect(screen.getByText("VibePrompt")).toBeInTheDocument();
    expect(screen.getByText("Mood to Motion")).toBeInTheDocument();
    expect(screen.getByLabelText("Search Tools")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore the Tools" })).toHaveAttribute(
      "href",
      "#tools"
    );
  });

  it("filters tools with search", () => {
    render(<Home />);

    const input = screen.getByLabelText("Search Tools");
    fireEvent.change(input, { target: { value: "font" } });

    expect(screen.getByText("SlimFont")).toBeInTheDocument();
    expect(screen.queryByText("ChopShop")).not.toBeInTheDocument();
  });

  it("finds the UI color tool by search keyword", () => {
    render(<Home />);

    const input = screen.getByLabelText("Search Tools");
    fireEvent.change(input, { target: { value: "color" } });

    expect(screen.getByText("UIColorGenerator")).toBeInTheDocument();
    expect(screen.queryByText("SlimFont")).not.toBeInTheDocument();
  });

  it("finds the vibe prompt tool by search keyword", () => {
    render(<Home />);

    const input = screen.getByLabelText("Search Tools");
    fireEvent.change(input, { target: { value: "vibe" } });

    expect(screen.getByText("VibePrompt")).toBeInTheDocument();
    expect(screen.queryByText("ChopShop")).not.toBeInTheDocument();
  });

  it("finds the mood to motion tool by search keyword", () => {
    render(<Home />);

    const input = screen.getByLabelText("Search Tools");
    fireEvent.change(input, { target: { value: "motion" } });

    expect(screen.getByText("Mood to Motion")).toBeInTheDocument();
    expect(screen.queryByText("ChopShop")).not.toBeInTheDocument();
  });
});
