describe('MainDashboard component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('displays ManagerNavbar', () => {
    cy.get('[data-testid="cypress-manager-navbar"]').should('exist');
  });

  it('displays ManagerSidebar', () => {
    cy.get('[data-testid="cypress-manager-sidebar"]').should('exist');
  });

  it('displays Dashboard by default', () => {
    cy.get('[data-testid="dashboard"]').should('exist');
  });

  it('switches to Cashiers when clicked', () => {
    cy.get('[data-testid="cashiers"]').click();
    cy.get('[data-testid="cashier-management-window"]').should('exist');
  });

  it('switches to Branches when clicked', () => {
    cy.get('[data-testid="branches"]').click();
    cy.get('[data-testid="branch-management-window"]').should('exist');
  });

  it('switches to Sales Summary when clicked', () => {
    cy.get('[data-testid="summary"]').click();
    cy.get('[data-testid="sales-management-window"]').should('exist');
  });

  it('switches to Items when clicked', () => {
    cy.get('[data-testid="items"]').click();
    cy.get('[data-testid="items-management-window"]').should('exist');
  });

  it('switches to Reports when clicked', () => {
    cy.get('[data-testid="reports"]').click();
    cy.get('[data-testid="saved-reports-window"]').should('exist');
  });

  it('switches to Feedbacks when clicked', () => {
    cy.get('[data-testid="feedbacks"]').click();
    cy.get('[data-testid="feedbacks-management-window"]').should('exist');
  });
});
