
export type Record = {
  type: 'record'
  id: string
  name: string
  category: string
  value: string | number
}

export type Option = Omit<Record, 'type'>

export type Cursor = {
  type: 'cursor',
  id: 'cursor'
}

export type Character = {
  type: 'character'
  id: string
  value: string
}

export type FormulaEror = '#ERROR'

export type FormulaValue = Record | Cursor | Character