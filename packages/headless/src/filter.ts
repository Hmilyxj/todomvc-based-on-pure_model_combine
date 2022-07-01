import { setupStore } from '@pure-model/core'

export type Filter = {}

const initialState: Filter = {
  arr: ['all', 'active', 'completed'],
  active: 'all',
}

export default function TodoFilter () {
  return setupStore({
    name: 'filter',
    initialState,
    reducers: {
      filterActiveAc,
      filterActive,
    }
  })
}

export const filterActive = (filter: Filter, active: string) => {
  return {
    ...filter,
    active: active
  }
}

export const filterActiveAc = (filter: Filter) => {
  return filter
}

