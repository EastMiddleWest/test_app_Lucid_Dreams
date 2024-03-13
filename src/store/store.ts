import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import type { FormulaValue, Record, Option } from '@/types'

type FormulaState = {
  values: FormulaValue[];
  setCursor: (index: number) => void;
  removeCursor: () => void;
  removeEntry: () => void;
  addEntry: (character: string) => void;
  addOption: (option: Record, offset: number) => void;
  replaceCursor: (direction: 'left' | 'right') => void
}

type OptionState = {
  options: Option[];
  filter: string;
  selected: {
    value: number;
    maxValue: number
  };
  setOptions: (options: Option[]) => void;
  setFilter: (word: string) => void;
  setSelectedValue: (index:number) => void;
  setMaxValue: (value: number) => void;
}


export const useFormula = create<FormulaState>((set) => ({
  values: [],
  setCursor: (index) => set(state =>{
    const values = [...state.values]
    const filtered = values.filter(el => el.type !== 'cursor')
    filtered.splice(index,0, {type: 'cursor', id:'cursor'})
    return {values: filtered}
  }),
  removeCursor: () => set(state => {
    let values = [...state.values]
    values = values.filter(el => el.type !== 'cursor')
    return {values}
  }),
  removeEntry: () => set(state => {
    const values = [...state.values]
    const cursorIndex = values.findIndex(el => el.type === 'cursor')
        if(cursorIndex > 0){
          values.splice(cursorIndex-1,1)
        }
        return {values}
  }),
  addEntry: (character) => set(state => {
    let values = [...state.values]
      const cursorIndex = values.findIndex(el => el.type === 'cursor')
      if(cursorIndex > 0){
        values.splice(cursorIndex,0,{type: 'character', id: uuidv4(), value: character})
      }
      else {
        values = [{type: 'character', id: uuidv4(), value: character}, ...values]
      }
      return {values}
  }),
  addOption: (option, offset) => set(state => {
    const values = [...state.values]
      const cursorIndex = values.findIndex(el => el.type === 'cursor')
      const insertIndex = cursorIndex - offset
      values.splice(insertIndex, offset, option)
      return {values}
  }),
  replaceCursor: (direction) => set(state => {
    const values = [...state.values]
    const cursorIndex = values.findIndex(el => el.type === 'cursor')
    const newPosition = direction === 'left' ? cursorIndex-1 : cursorIndex+1
    if(newPosition > values.length-1 || newPosition < 0) return {values}
    else{
      const replacedEl = values[newPosition]
      values[newPosition] = values[cursorIndex]
      values[cursorIndex] = replacedEl
      return {values}
    }
  })
}))

export const useOptions = create<OptionState>((set) => ({
  options: [],
  filter: '',
  selected: {
    value: -1,
    maxValue: 0
  },
  setOptions: (options) => set(() => {
    return {options}
  }),
  setFilter: (word) => set(() => {
    return {filter: word}
  }),
  setSelectedValue: (index) => set((state) => {
    const maxValue = state.selected.maxValue
    return {
      selected:{
        value: index < 0 ? maxValue : index > maxValue ? 0 : index,
        maxValue
      }
    }
  }),
  setMaxValue: (value) => set(state => {
    return {
      selected:{
        value: state.selected.value,
        maxValue: value
      }
    }
  })
}))
