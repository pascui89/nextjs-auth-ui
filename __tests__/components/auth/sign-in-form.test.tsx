"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignInForm } from "@/components/auth/sign-in-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}))

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("SignInForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    const mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    ;(signIn as jest.Mock).mockResolvedValue({ error: null })
  })

  it("renders the sign-in form correctly", () => {
    render(<SignInForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  });

  it("submits the form with valid data", async () => {
    render(<SignInForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
      })

      const router = useRouter()
      expect(router.push).toHaveBeenCalledWith("/dashboard")
      expect(router.refresh).toHaveBeenCalled()
    })
  });
})

