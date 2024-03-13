import type { FormulaValue, Record, Character } from "@/types"

type Operand = '' | '+' | '-' | '*' | '/' | '^'

const stringifyFormula = (formula: FormulaValue[]) => {
  const filterd = formula.filter(el => el.type !== 'cursor') as Array<Record | Character>
  return filterd.map(el => el.value).join('')
}

const calculateValues = (operations: string[]): number => {
  let operand: Operand = ''
  const obj = {
    value: Number(operations[0]),
    '': function(){},
    '+': function(num: string){
      this.value += Number(num)
    },
    '-': function(num: string){
      this.value -= Number(num)
    },
    '*': function(num: string){
      this.value *= Number(num)
    },
    '/': function(num: string){
      this.value /= Number(num)
    },
    '^': function(num: string){
      this.value ^= Number(num)
    },
  }
  let i = 1;
  console.log('OOOO: ',operations)
  while ( i < operations.length) {
    const el = operations[i];
    if(el === '('){
      const close = operations.lastIndexOf(')')
      const formula = operations.slice(i+1, close)
      console.log('formula: ', formula)
      operations[i] = calculateValues(formula).toString()
      console.log(operations)
      operations = operations.filter((_el, index) =>  !(index > i && index < close+1))
      console.log('op: ',operations)
      console.log('i', i, obj)
      i--
    }
    // eslint-disable-next-line no-useless-escape
    else if(/\+|\-|\*|\/|\^/.test(el)){
      operand = el as Operand
      i++
    }
    else {
      obj[operand](el)
      i++
    }
  }

  return obj.value
}

export const calculate = (formula: FormulaValue[]) => {
  const str = stringifyFormula(formula)
  // eslint-disable-next-line no-useless-escape
  const operations = str.split(/(\+|\-|\*|\/|\^|\(|\))/).filter(el => !!el)
  return calculateValues(operations)
}
