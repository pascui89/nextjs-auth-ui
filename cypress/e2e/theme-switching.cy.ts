describe("Theme Switching", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should switch between themes", () => {
    // Open theme selector
    cy.get('button[aria-label="Select theme"]').click()

    // Select dark theme
    cy.contains("Dark").click()

    // Check if dark theme class is applied
    cy.get("html").should("have.class", "dark")

    // Open theme selector again
    cy.get('button[aria-label="Select theme"]').click()

    // Select light theme
    cy.contains("Light").click()

    // Check if dark theme class is removed
    cy.get("html").should("not.have.class", "dark")

    // Open theme selector again
    cy.get('button[aria-label="Select theme"]').click()

    // Select purple theme
    cy.contains("Purple").click()

    // Check if purple theme class is applied
    cy.get("html").should("have.class", "purple")
  })
})

