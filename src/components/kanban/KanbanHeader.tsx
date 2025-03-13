"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Plus, Sun } from "lucide-react";
import { Separator } from "../ui/separator";
import { AnimatePresence } from "motion/react";
import RotateMotion from "../motion/RotateMotion";
function KanbanHeader() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 ">
        <AnimatePresence mode="wait">
          <Button variant="icon" onClick={toggleTheme} className="s">
            {theme === "light" ? (
              <RotateMotion key="sun">
                <Sun className="!size-4" />
              </RotateMotion>
            ) : (
              <RotateMotion key="moon">
                <Moon className="!size-4" />
              </RotateMotion>
            )}
          </Button>
        </AnimatePresence>

        <Separator orientation="vertical" className="!h-8" />
        <Button variant="icon" className="s">
          <Plus className="!size-4" />
        </Button>
      </div>
    </div>
  );
}

export default KanbanHeader;
