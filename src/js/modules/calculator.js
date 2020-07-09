// Project main module
import {score, scoreOperations} from './selectors'
import * as GET_ from './getters'
import * as SET_ from './setters'

// Change value toLocaleString
const parseToLocale = (val) => {
  // Parses number according to language-sensitive representation
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  return val.toLocaleString('pl-PL')
}

// Perform computation
const computeValue = () => {
  let computedValue
  const prevValue = GET_.getPrevValue().toString().includes(',')
                    ? parseFloat(GET_.getPrevValue().toString().replace(',','.'))
                    : parseFloat(GET_.getPrevValue())

  const currValue = GET_.getCurrValue().toString().includes(',')
                    ? parseFloat(GET_.getCurrValue().toString().replace(',','.'))
                    : parseFloat(GET_.getCurrValue())

  if (GET_.getCurrOperation() !== '%') {
    if (isNaN(currValue) || isNaN(prevValue) ) return
  }

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


// Toggle current value between negative and positive value
const toggleNegativeValue = () => {
  SET_.setCurrValue(parseFloat(GET_.getCurrValue().toString().replace(',','.')) * -1)
}

// Clear all values
const clearAll = () => {
  SET_.setPrevValue('')
  SET_.setCurrValue('')
  SET_.setCurrOperation(null)
  SET_.setEqualOperation(false)
  score.textContent = '0'
  scoreOperations.textContent = ''
}

// Get button number value
export const getNumber = (number) => {
  if (isNaN(number) && GET_.getCurrValue().includes(',')) return
  if (score.textContent === '0' && number === ',') return SET_.setCurrValue(`${score.textContent}${number}`)
  if (GET_.getCurrValue() === '0' && number === '0') return SET_.setCurrValue(`${number}`)
  if (GET_.getPercentOperation()) {
    SET_.setCurrValue('')
    SET_.setPercentOperation(false)
  }

  SET_.setCurrValue(`${GET_.getCurrValue()}${number}`)
}

// Get button operation value
export const getOperation = (operation) => {
    if (operation === 'C') return clearAll()
    if (operation === '+/-') return toggleNegativeValue()
    if (operation === '=' )  {
      SET_.setEqualOperation(true)
      return computeValue()
    }
    if (operation === '%' )  {
      SET_.setPercentOperation(true)
      SET_.setCurrOperation(operation)
      if (GET_.getCurrValue() === '' && scoreOperations.textContent !== '') SET_.setCurrValue(scoreOperations.textContent)
      return computeValue()
    }
    if (GET_.getCurrValue() === '' && GET_.getPrevValue() === '' && scoreOperations.textContent !== '') scoreOperations.textContent = ''
    if (GET_.getCurrValue() === '' ) return
    if (GET_.getPrevValue() !== '' ) computeValue()

    SET_.setCurrOperation(operation)
    SET_.setPrevValue(GET_.getCurrValue())
    SET_.setCurrValue('')
}


// Display values
export const updateDisplay = () => {
  if (GET_.getCurrValue() === '') {
    score.textContent = '0'

  } else {
    if (GET_.getEqualOperation()) {
      scoreOperations.textContent = parseToLocale(GET_.getCurrValue())
      score.textContent = parseToLocale(GET_.getCurrValue())
      SET_.setCurrValue('')
      SET_.setEqualOperation(false)

    } else {
      score.textContent = parseToLocale(GET_.getCurrValue())
    }
  }

  if (GET_.getCurrOperation() != null) {
    if (GET_.getPrevValue() !== '') scoreOperations.textContent = `${parseToLocale(GET_.getPrevValue())} ${GET_.getCurrOperation()}`
  } else {
    SET_.setPrevValue('')
  }

}