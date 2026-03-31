import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

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
  it("renders hero content and all tool cards", () => {
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
    expect(screen.getByRole("link", { name: "Explore the Tools" })).toHaveAttribute(
      "href",
      "#tools"
    );
  });
});
