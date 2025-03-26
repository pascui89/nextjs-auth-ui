"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { SignInForm } from "@/components/auth/sign-in-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

// Mock the modules
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}))

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("SignInForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Setup router mock
    const mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    // Setup signIn mock
    ;(signIn as jest.Mock).mockResolvedValue({ error: null })
  })

  it("renders the sign-in form correctly", () => {
    render(<SignInForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("validates email input", async () => {
    render(<SignInForm />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it("validates password input", async () => {
    render(<SignInForm />)

    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: "123" } })
    fireEvent.blur(passwordInput)

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

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
  })

  it("shows an error message when sign-in fails", async () => {
    // Mock signIn to return an error
    ;(signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" })

    render(<SignInForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })
  })
})

