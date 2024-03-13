import { Option } from "@/types"

import { filterUniqueOptions } from "@/utilities/filterUniqueOptions"

export const fetchOptions = async(query: string) =>{
  const url = new URL(import.meta.env.VITE_API_URL)
  url.searchParams.append('name',query )
    const res = await fetch(url,{
      method: 'GET'
    })
    if(res.ok){
      const data = await res.json() as Option[]
      return filterUniqueOptions(data)
    }
    else {
      throw new Error('Data not found')
    }
}