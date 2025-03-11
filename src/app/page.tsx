"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
function Page() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-foreground">{theme}</h1>
      <Button onClick={() => toggleTheme()}>Click me</Button>
    </div>
  );
}
export default Page;
