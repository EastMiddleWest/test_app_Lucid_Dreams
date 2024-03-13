import type {Option} from '@/types'


export const filterUniqueOptions = (data: Option[]) => {
  const set = new Set()
  const filtered = data.filter(el => {
    if(set.has(el.id)) return false
    else {
      set.add(el.id)
      return true
    }
  })
  return filtered
}