describe("Authentication Flow", () => {
  beforeEach(() => {
    // Reset any previous state
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it("should navigate to sign in page", () => {
    cy.visit("/")
    cy.get("a").contains("Sign In").click()
    cy.url().should("include", "/auth/signin")
    cy.get("h1").contains("Sign In").should("be.visible")
  })

  it("should show validation errors on sign in form", () => {
    cy.visit("/auth/signin")

    // Submit empty form
    cy.get("button").contains("Sign In").click()

    // Check for validation errors
    cy.contains("Please enter a valid email address").should("be.visible")
    cy.contains("Password must be at least 8 characters").should("be.visible")

    // Fill with invalid email
    cy.get('input[placeholder="your.email@example.com"]').type("invalid-email")
    cy.get("button").contains("Sign In").click()
    cy.contains("Please enter a valid email address").should("be.visible")
  })

  it("should navigate to sign up page", () => {
    cy.visit("/")
    cy.get("a").contains("Sign Up").click()
    cy.url().should("include", "/auth/signup")
    cy.get("h1").contains("Create an Account").should("be.visible")
  })

  it("should show validation errors on sign up form", () => {
    cy.visit("/auth/signup")

    // Submit empty form
    cy.get("button").contains("Create Account").click()

    // Check for validation errors
    cy.contains("Name must be at least 2 characters").should("be.visible")
    cy.contains("Please enter a valid email address").should("be.visible")
    cy.contains("Password must be at least 8 characters").should("be.visible")

    // Fill with valid name but invalid email
    cy.get('input[placeholder="John Doe"]').type("Test User")
    cy.get('input[placeholder="your.email@example.com"]').type("invalid-email")
    cy.get("button").contains("Create Account").click()
    cy.contains("Please enter a valid email address").should("be.visible")
  })

  // This test would require mocking the authentication API
  it.skip("should sign in successfully with valid credentials", () => {
    // This would need to be implemented with proper API mocking
    cy.visit("/auth/signin")

    cy.get('input[placeholder="your.email@example.com"]').type("test@example.com")
    cy.get('input[placeholder="••••••••"]').type("password123")
    cy.get("button").contains("Sign In").click()

    // Check redirect to dashboard
    cy.url().should("include", "/dashboard")
    cy.contains("Dashboard").should("be.visible")
  })
})

