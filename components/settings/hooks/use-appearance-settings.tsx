"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "@/components/ui/use-toast";

export function useAppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme || "system");
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
  };

  const saveChanges = async () => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTheme(selectedTheme);

      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update appearance settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: {
      selectedTheme,
      isLoading,
    },
    actions: {
      handleThemeChange,
      saveChanges,
    },
  };
}