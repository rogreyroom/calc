// All project getters

import * as vars from './variables'

export const getCurrValue = () => {
  return vars.currValue
}

export const getPrevValue = () => {
  return vars.prevValue
}

export const getCurrOperation = () => {
  return (vars.currOperation)
}

export const getEqualOperation = () => {
  return vars.equalOperation
}

export const getPercentOperation = () => {
  return vars.percentOperation
}
