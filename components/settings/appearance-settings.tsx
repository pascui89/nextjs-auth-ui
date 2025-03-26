"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme || "system")
  const [isLoading, setIsLoading] = useState(false)

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
  }

  const saveChanges = async () => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setTheme(selectedTheme)

      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appearance settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the appearance of the application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
          </div>

          <RadioGroup
            value={selectedTheme}
            onValueChange={handleThemeChange}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
          >
            <div>
              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
              <Label
                htmlFor="theme-light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="h-2 w-[80px] rounded-lg bg-[#eaeaea]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#eaeaea]" />
                  </div>
                </div>
                <span className="block w-full text-center font-normal">Light</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
              <Label
                htmlFor="theme-dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 rounded-md bg-slate-950 p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-800" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-800" />
                  </div>
                </div>
                <span className="block w-full text-center font-normal">Dark</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="purple" id="theme-purple" className="sr-only" />
              <Label
                htmlFor="theme-purple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 rounded-md bg-purple-50 p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="h-2 w-[80px] rounded-lg bg-purple-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-purple-400" />
                  </div>
                </div>
                <span className="block w-full text-center font-normal">Purple</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="green" id="theme-green" className="sr-only" />
              <Label
                htmlFor="theme-green"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 rounded-md bg-green-50 p-2 shadow-sm">
                  <div className="space-y-2">
                    <div className="h-2 w-[80px] rounded-lg bg-green-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-green-400" />
                  </div>
                </div>
                <span className="block w-full text-center font-normal">Green</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button onClick={saveChanges} disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

