/// <reference types="cypress" />

describe('Our first suite', () => {
    it('First test', () => {
        //In order to open our application in the Cypress, add visit. We already provided the base URL in our cypress.conig.js file
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by Tag Name
        cy.get('input')
        // by ID
        cy.get('#inputEmail') //copy the value of the ID, add the # before the ID value
        // by Class name
        cy.get('.input-full-width') //copy the value of the class, if class has several values which use the space to separate. Add . before the value.
        // by Attribute name
        cy.get('[placeholder]')
        // by Attribute name and value
        cy.get('[placeholder="Email"]')
        // by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]') //-> the entire value for the class attribute
        // by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')
        // by two different attributes, or three, all work fine.
        cy.get('[placeholder="Email"][fullwidth]')
        // by tag name, Attributes with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
        // The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]') //-> Create your own locator, attribute and value

    })

    it('Our second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Add locator to web element
        cy.get('[data-cy="signInButton"]')
        // Find element by the text name
        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        /*Also can look for the unique ID in the section, such as Email element has ID, then travel to the Sign in button.
        In order to travel to the Sign in button, we can’t travel down to the Sign in button, we need to travel up to the parent element.
        we can't use get, if use get, will get all the button on this page*
        assertion */
        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain','Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click({force: true}) //the center of the element try to click on is not visible within the viewport. So add {force: true}

        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

    it('then and wrap method', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //Selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')
        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //cypress style
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
          const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
          const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
          expect(emailLabelFirst).to.equal('Email')
          expect(passwordLabelFirst).to.equal('Password')

          //Variable saved in the first function will be available and visible for each nested function.
          cy.contains('nb-card', 'Basic form').then(secondForm => {
            const passwordLabelScond = secondForm.find('[for="exampleInputPassword1"]').text()
            expect(passwordLabelFirst).to.equal(passwordLabelScond)
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
          })
      })

    })

    it('invoke test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1.
        cy.get('[for="exampleInputEmail1"]')
          .should('contain', 'Email address')
          .should('have.class', 'label')
          .and('have.text', 'Email address')
        //2.
        cy.get('[for="exampleInputEmail1"]').then(label => {
          expect(label.text()).to.equal('Email address')
          expect(label).to.have.class('label')
          expect(label).to.have.text('Email address')
        })
        //3 Invoke
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
          expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
          .find('nb-checkbox')
          .click()
          .find('.custom-checkbox')
          .invoke('attr', 'class')
          // .should('contain', 'checked')
          .then(classValue => {
            expect(classValue).to.contain('checked')
          })

    })

    it('assert property', () => {
      ////inspect, check properties, value.
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
          cy.wrap(input).click({force: true})
          cy.get('nb-calendar-picker').contains('17').click()
          cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 17, 2023')
        })

    })

    it('radio button', () => {
      cy.visit('/')
      cy.contains('Form').click()
      cy.contains('Form Layouts').click()

      cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons)
          .first()
          // .eq(0)
          .check({force: true})
          .should('be.checked')
        cy.wrap(radioButtons)
          .eq(1)
          .check({force: true})
          .should('be.checked')
        cy.wrap(radioButtons)
          .first()
          .should('not.be.checked')
        cy.wrap(radioButtons)
          .eq(2)
          .should('be.disabled')

      })
    })

    it('checkbox', () => {
      cy.visit('/')
      cy.contains('Modal & Overlays').click()
      cy.contains('Toastr').click()

      // cy.get('[type="checkbox"]').check({force: true})
      cy.get('[type="checkbox"]').eq(0).click({force: true})
      cy.get('[type="checkbox"]').eq(1).check({force: true})

    })

    it('date picker', () => {
      function selectDayFromCurrent(day) {
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', { month: 'short' })
        let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
          }
        })
        return dateAssert
      }

        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
          cy.wrap(input).click({force: true})
          let dateAssert = selectDayFromCurrent(100)
          cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
          cy.wrap(input).should('have.value', dateAssert)
        })
    })

    it('lists and dropdowns', () => {
      cy.visit('/')
      //1.need to repeat
      // cy.get('[class="select-button"]').click()
      // cy.get('nav nb-select').click()
      // cy.get('.options-list').contains(' Dark').click()
      // cy.get('[class="select-button"]').should('contain', 'Dark')
      // cy.get('nav nb-select').should('contain','Dark')
      // cy.get('nb-layout-header nav').should('have.css' , 'background-color', 'rgb(34, 43, 69)')
      //2.
      cy.get('[class="select-button"]').then(dropDown => {
      // cy.get('nav nb-select').then(dropDown => {
        cy.wrap(dropDown).click()
        cy.get('.options-list nb-option').each((listItem, index) => {
          const itemText = listItem.text().trim()
          const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'
          }
          cy.wrap(listItem).click()
          cy.wrap(dropDown).should('contain', itemText)
          cy.get('nb-layout-header nav').should('have.css' , 'background-color', colors[itemText])
          if(index < 3){
            cy.wrap(dropDown).click()
          }
        })
      })
    })

    it('Web tables', () => {
      cy.visit('/')
      cy.contains('Tables & Data').click()
      cy.contains('Smart Table').click()

      //1.
      cy.get('tbody').contains('tr','Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        // cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type('20')
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('20')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain','20')
      })
      //2.
      cy.get('thead').find('.nb-plus').click()
      cy.get('thead tr').eq(2).then(tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Claire')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Li')
        cy.wrap(tableRow).find('.nb-checkmark').click()
      })
      cy.get('tbody tr').first().find('td').then(tableColumn => {
        cy.wrap(tableColumn).eq(2).should('contain','Claire')
        cy.wrap(tableColumn).eq(3).should('contain', 'Li')
      })
      //3.
      const age = [20, 30, 40, 200]
      cy.wrap(age).each(age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each(tableRow => {
          if(age === 200){
            cy.wrap(tableRow).find('td').should('contain', 'No data found')
          } else{
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
          }
        })
      })
    })

    it('Tooltip', () => {
      cy.visit('/')
      cy.contains('Modal & Overlays').click()
      cy.contains('Tooltip').click()

      cy.contains('nb-card', 'Colored Tooltips')
        .contains('Default').click()
      cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('dialog box', () => {
      cy.visit('/')
      cy.contains('Tables & Data').click()
      cy.contains('Smart Table').click()

      //1.Not good to use
      // cy.get('tbody tr').first().find('.nb-trash').click()
      // cy.on('window:alert', (confirm) => {
      //   expect(confirm).to.equal('Are you sure you want to delete this item?')
      // })
      //2.
      const stub = cy.stub()
      cy.on('window:confirm', stub)
      cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      })
      // 3. cancell confirm
      cy.get('tbody tr').first().find('.nb-trash').click()
      cy.on('window:confirm', () => false)

    })

})
