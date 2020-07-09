// Project main module
import {score, scoreOperations} from './selectors'
import * as GET_ from './getters'
import * as SET_ from './setters'

// Helpers
const computeValue = () => {
  let computedValue
  const prevValue = GET_.getPrevValue().toString().includes(',')
                    ? parseFloat(GET_.getPrevValue().toString().replace(',','.'))
                    : parseFloat(GET_.getPrevValue())

  const currValue = GET_.getCurrValue().toString().includes(',')
                    ? parseFloat(GET_.getCurrValue().toString().replace(',','.'))
                    : parseFloat(GET_.getCurrValue())

  switch (GET_.getCurrOperation()) {
    case '+':
      computedValue = prevValue + currValue
      break
    case '-':
      computedValue = prevValue - currValue
      break
    case '*':
      computedValue = prevValue * currValue
      break
    case '/':
      computedValue = prevValue / currValue
      break
    case '%':
      computedValue = (currValue / 100) * 1
      break
    default:
      return
  }
  SET_.setCurrValue(computedValue)
  SET_.setCurrOperation(null)
  SET_.setPrevValue('')
}


// Operations
const toggleNegativeValue = () => {
  SET_.setCurrValue(parseFloat(GET_.getCurrValue()) * -1)
}

const clearAll = () => {
  SET_.setPrevValue('')
  SET_.setCurrValue('')
  SET_.setCurrOperation(null)
  score.textContent = '0'
  scoreOperations.textContent = ''
}


export const getNumber = (number) => {
  SET_.setCurrValue(`${GET_.getCurrValue()}${number}`)

  console.log('Number', 'Curr val: ', GET_.getCurrValue());
}

export const getOperation = (operation) => {
    if (operation === 'C') return clearAll()
    if (operation === '+/-') return toggleNegativeValue()
    if (GET_.getPrevValue() !== '' ) computeValue()

    SET_.setCurrOperation(operation)
    SET_.setPrevValue(GET_.getCurrValue())
    SET_.setCurrValue('')

    console.log('Operation', 'Curr operation: ', GET_.getCurrOperation(), 'Curr val: ', GET_.getCurrValue(), 'Prev val: ', GET_.getPrevValue());
}

// Display values
export const updateDisplay = () => {
  console.log('Display');
  score.textContent = GET_.getCurrValue()
}