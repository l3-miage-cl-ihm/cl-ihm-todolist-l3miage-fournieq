import { TodoItem } from './../../src/app/todolist.service';
describe('My First Test', () => {
  it('Verification qu\'il y a 0 balise li dans le ul initialement', () => {
    cy.visit('/')
    //cy.contains('Welcome')
    //cy.contains('sandbox app is running!')
    cy.get('li.todo-list').should('have.length', 0)

  })
})
