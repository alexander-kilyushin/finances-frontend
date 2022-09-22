// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  localStorage.clear()
  cy.exec(
    'echo "bash /var/app/database/scripts/restore-db-from-testing-template.sh" | docker exec -i personal-app-database bash;'
  )
})

after(() => {
  cy.exec(
    'echo "bash /var/app/database/scripts/restore-db-from-dev-template.sh" | docker exec -i personal-app-database bash;'
  )
})
