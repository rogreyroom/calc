// All project event listners

import { operations, numbers } from './selectors'

operations.forEach(
    operation => operation.addEventListener('click',
    ({target}) => {
        getOperation(target.getAttribute('data-operation'))
        updateDisplay()
    })
)
numbers.forEach(
    number => number.addEventListener('click',
    ({target}) => {
        getNumber(target.getAttribute('data-number'))
        updateDisplay()
    })
)
