import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test With Page Objects', () => {
    beforeEach('Open application', () => {
      cy.openHomePage()
    })

    it('verify navigation accross the pages', () => {
      navigateTo.formLayoutsPage()
      navigateTo.datepickerPage()
      navigateTo.toasterPage()
      navigateTo.smartTablePage()
      navigateTo.toolTipPage()

    })

    it.only('should submit Inline and Basic form and select tomorrow date in calendar', () => {
      navigateTo.formLayoutsPage()
      onFormLayoutsPage.submitInlineFormWithNameAndEmail('John', 'John@test.com')
      onFormLayoutsPage.submitBasicFormWithEmailAndPassword('John@test.com', 'password')
      navigateTo.datepickerPage()
      onDatePickerPage.selectCommonDatePickerDateFromToday(1)
      onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14)
      navigateTo.smartTablePage()
      onSmartTablePage.updateAgeByFirstName('Larry', 25)
      onSmartTablePage.addNewWithFirstNameAndLastName('John', 'Smith')
      onSmartTablePage.deleteRowByIndex(0)
    })

})
