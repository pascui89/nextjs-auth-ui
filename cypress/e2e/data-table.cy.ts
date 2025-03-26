describe("Data Table", () => {
  beforeEach(() => {
    // Mock authentication - this would need to be implemented properly
    cy.visit("/data")

    // For now, we'll just check if we're redirected to login
    cy.url().then((url) => {
      if (url.includes("/auth/signin")) {
        // Skip the test if we can't authenticate
        cy.log("Authentication required - skipping test")
        cy.end()
      }
    })
  })

  it("should display data table with pagination", () => {
    // Check for table headers
    cy.contains("ID").should("be.visible")
    cy.contains("Name").should("be.visible")
    cy.contains("Email").should("be.visible")
    cy.contains("Status").should("be.visible")

    // Check pagination
    cy.contains("Showing").should("be.visible")
    cy.get('button[aria-label="Go to next page"]').should("be.visible")
  })

  it("should filter data", () => {
    // Open filter dropdown
    cy.contains("button", "Filters").click()

    // Select a status filter
    cy.contains("active").click()

    // Apply filters
    cy.contains("button", "Apply").click()

    // URL should include the filter
    cy.url().should("include", "status=active")
  })

  it("should sort data", () => {
    // Click on a column header to sort
    cy.contains("button", "Name").click()

    // URL should include sort parameters
    cy.url().should("include", "sortBy=name")

    // Click again to reverse sort order
    cy.contains("button", "Name").click()
    cy.url().should("include", "sortOrder=desc")
  })

  it("should change page size", () => {
    // Open page size dropdown
    cy.get("span").contains("10").click()

    // Select a different page size
    cy.contains("20").click()

    // URL should include the new page size
    cy.url().should("include", "pageSize=20")

    // Table should show more rows
    cy.get("tbody tr").should("have.length", 20)
  })

  it("should search data", () => {
    // Type in search box
    cy.get('input[placeholder="Search users..."]').type("test")

    // Wait for debounce
    cy.wait(500)

    // URL should include search parameter
    cy.url().should("include", "search=test")
  })
})

