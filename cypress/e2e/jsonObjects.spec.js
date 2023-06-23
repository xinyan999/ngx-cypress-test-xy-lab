/// <reference types="cypress" />

describe('Json objects', () => {
  it('Json objects', () => {
    cy.openHomePage()

    const simplyObject = {'key': 'value', 'key2': 'value2'}

    const simpleArrayOfValue = ['one', 'two', 'three']

    const arrayOfObjects = [{'key': 'value'}, {'key2': 'value2'}, {'key3': 'value3'}]

    const typesOfData = {'string':'this is a string', 'number': 10}

    const mix = {
      'firstName': 'John',
      'lastName': 'Smith',
      'age': 30,
      'students': [
        {
          'firstName': 'Sara',
          'lastName': 'Conor'
        },
        {
          'firstName': 'Bruce',
          'lastName': 'Willis'
        }
      ]
    }
  })
})
