import type { FormulaValue, Record, Character, FormulaEror } from "@/types"

type Operand =  '+' | '-' | '*' | '/' | '^'

type Calculator = {
  [key in  Operand]: (num1: string, num2: string) => number
}

const stringifyFormula = (formula: FormulaValue[]) => {
  const filterd = formula.filter(el => el.type !== 'cursor') as Array<Record | Character>
  return filterd.map(el => el.value).join('')
}

const calculator: Calculator = {
  '+': function(num1: string, num2: string){
    return Number(num1) + Number(num2)
  },
  '-': function(num1: string, num2: string){
    return Number(num1) - Number(num2)
  },
  '*': function(num1: string, num2: string){
    return Number(num1) * Number(num2)
  },
  '/': function(num1: string, num2: string){
    return Number(num1) / Number(num2)
  },
  '^': function(num1: string, num2: string){
    return Number(num1) ** Number(num2)
  },
}

const calculateValues = (operations: string[]): number | FormulaEror => {
  const collapse = (i: number) => {
    const operand = operations[i] as Operand
    return String(calculator[operand](operations[i-1], operations[i+1]))
  }
  const parenthesesIndex = operations.indexOf('(')
  if(parenthesesIndex >= 0){
    const close = operations.lastIndexOf(')')
    const formula = operations.slice(parenthesesIndex+1, close)
    operations[parenthesesIndex] = calculateValues(formula).toString()
    operations = operations.filter((_el, index) =>  !(index > parenthesesIndex && index < close+1))
  }
  const operands = ['^', '*', '/', '+', '-']
  while (operands.length) {
    const i = operations.indexOf(operands[0])
    if(i >=0 ) operations = [...operations.slice(0,i-1), collapse(i), ...operations.slice(i+2)]
    else operands.shift()
  }
  if(operations.length === 1){
    const result = Number(operations[0])
    return isNaN(result) ? '#ERROR' : result
  }
  return '#ERROR'
}

export const calculate = (formula: FormulaValue[]) => {
  const str = stringifyFormula(formula)
  // eslint-disable-next-line no-useless-escape
  const operations = str.split(/(\+|\-|\*|\/|\^|\(|\))/).filter(el => !!el)
  return calculateValues(operations)
}
