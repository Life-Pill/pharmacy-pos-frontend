import React from 'react'
import OrderDetailsSideBar from './OrderDetailsSideBar'

describe('<OrderDetailsSideBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<OrderDetailsSideBar />)
  })
})