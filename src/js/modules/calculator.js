// Project main module
import {score, scoreOperations} from './selectors'
import * as GET_ from './getters'
import * as SET_ from './setters'

// Operations
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

    SET_.setCurrOperation(operation)
    SET_.setPrevValue(GET_.getCurrValue())
    SET_.setCurrValue('')

    console.log('Operation', 'Curr operation: ', GET_.getCurrOperation());
}

// Display values
export const updateDisplay = () => {
  console.log('Display');
}