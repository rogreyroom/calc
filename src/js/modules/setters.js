// All project setters

import * as vars from './variables'

export const setCurrValue = (val) => {
  return (vars.currValue = val)
}

export const setPrevValue = (val) => {
  return (vars.prevValue = val)
}

export const setCurrOperation = (val) => {
  return (vars.currOperation = val)
}