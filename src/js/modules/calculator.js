// Project main module

import * as GET_ from './getters'
import * as SET_ from './setters'

// Operations

import { getCurrValue } from "./getters";

export const getNumber = (number) => {
  console.log('Number', 'Curr val: ', GET_.getCurrValue());
}

export const getOperation = (operation) => {
    console.log('Operation', 'Curr operation: ', GET_.getCurrOperation());
}

// Display values
export const updateDisplay = () => {
  console.log('Display');
}