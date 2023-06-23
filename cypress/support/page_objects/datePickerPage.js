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
      // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
    }
  })
  return dateAssert
}

export class DatePickerPage {
    selectCommonDatePickerDateFromToday(dateFromToday){
      cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
        cy.wrap(input).click({force: true})
        let dateAssert = selectDayFromCurrent(dateFromToday)
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        cy.wrap(input).should('have.value', dateAssert)
      })
    }

    selectDatePickerWithRangeFromToday(firstDate, secondDate){
      cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
        cy.wrap(input).click({force: true})
        let dateAssertFirst = selectDayFromCurrent(firstDate)
        let dateAssertSecond = selectDayFromCurrent(secondDate)
        let dateAssert = dateAssertFirst + ' - ' + dateAssertSecond
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        cy.wrap(input).should('have.value', dateAssert)
      })
    }
}

export const onDatePickerPage = new DatePickerPage()
